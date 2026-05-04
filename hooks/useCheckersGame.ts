import { useEffect, useState, useCallback, useRef } from 'react';
import { useSession, useSocket } from '@beta-gamer/react-native';

interface Piece { player: 'red' | 'black'; type: 'man' | 'king'; }
interface Move { from: number; to: number; captures?: number[]; }

export function useCheckersGame() {
  const socket = useSocket();
  const session = useSession();
  const myPlayer = session.players[0];
  const tokenPlayerId = myPlayer?.id ?? '';

  const [roomId, setRoomId] = useState<string | null>(null);
  const [myPlayerId, setMyPlayerId] = useState(tokenPlayerId);
  const [myColor, setMyColor] = useState<'red' | 'black'>('red');
  const [board, setBoard] = useState<(Piece | null)[]>(Array(64).fill(null));
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [validMoves, setValidMoves] = useState<Move[]>([]);
  const [lastMove, setLastMove] = useState<{ from: number; to: number } | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<{ winner: string | null; reason: string } | null>(null);
  const [afkWarning, setAfkWarning] = useState<{ playerId: string; secondsRemaining: number } | null>(null);

  const afkCountdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const roomIdRef = useRef<string | null>(null);

  const isMyTurn = myPlayerId ? (currentTurn === 0 ? myColor === 'red' : myColor === 'black') : false;

  useEffect(() => {
    if (!socket) return;

    const join = () => socket.emit('matchmaking:join', {
      username: myPlayer?.displayName || 'Player',
      playerId: tokenPlayerId,
      wantsBot: true,
      botDifficulty: 'easy',
    });

    if (socket.connected) join();
    else socket.once('connect', join);

    socket.on('game:started', (d: any) => {
      setRoomId(d.roomId);
      roomIdRef.current = d.roomId;
      setMyPlayerId(d.playerId);
      setMyColor(d.color);
      setBoard(d.board);
      setCurrentTurn(d.currentTurn ?? 0);
      setPlayers(d.players || []);
    });

    socket.on('game:move:made', (d: any) => {
      setBoard(d.board);
      setCurrentTurn(d.currentTurn ?? 0);
      setSelectedPiece(null);
      setValidMoves([]);
      if (d.move) {
        setLastMove({ from: d.move.from, to: d.move.to });
      }
      setAfkWarning(null);
      if (afkCountdownRef.current) {
        clearInterval(afkCountdownRef.current);
        afkCountdownRef.current = null;
      }
    });

    socket.on('checkers:afk_warning', (d: { playerId: string; secondsRemaining: number }) => {
      setAfkWarning(d);
      if (afkCountdownRef.current) clearInterval(afkCountdownRef.current);
      afkCountdownRef.current = setInterval(() => {
        setAfkWarning(prev => {
          if (!prev || prev.secondsRemaining <= 1) {
            clearInterval(afkCountdownRef.current!);
            afkCountdownRef.current = null;
            return prev;
          }
          return { ...prev, secondsRemaining: prev.secondsRemaining - 1 };
        });
      }, 1000);
    });

    socket.on('checkers:afk_warning_cleared', () => {
      if (afkCountdownRef.current) {
        clearInterval(afkCountdownRef.current);
        afkCountdownRef.current = null;
      }
      setAfkWarning(null);
    });

    socket.on('game:valid_moves', (d: { position: number; moves: Move[] }) => {
      setSelectedPiece(d.position);
      setValidMoves(d.moves);
    });

    socket.on('game:over', (d: { winner?: string; reason: string }) => {
      const result = { winner: d.winner ?? null, reason: d.reason };
      setGameResult(result);
      setTimeout(() => setGameOver(true), 400);
    });

    return () => {
      socket.off('connect', join);
      socket.off('game:started');
      socket.off('game:move:made');
      socket.off('checkers:afk_warning');
      socket.off('checkers:afk_warning_cleared');
      socket.off('game:valid_moves');
      socket.off('game:over');
      if (afkCountdownRef.current) clearInterval(afkCountdownRef.current);
    };
  }, [socket, myPlayer?.displayName, tokenPlayerId]);

  const handleCellPress = useCallback((position: number) => {
    if (!socket || !roomId || !myPlayerId || gameOver || !isMyTurn) return;

    // If a valid move destination is clicked, execute the move
    const move = validMoves.find(m => m.to === position);
    if (move) {
      socket.emit('game:move', { roomId, playerId: myPlayerId, move });
      setSelectedPiece(null);
      setValidMoves([]);
      return;
    }

    // Otherwise request valid moves for this piece
    const piece = board[position];
    if (piece && piece.player === myColor) {
      socket.emit('game:get_moves', { roomId, position, playerId: myPlayerId });
    } else {
      setSelectedPiece(null);
      setValidMoves([]);
    }
  }, [socket, roomId, myPlayerId, gameOver, isMyTurn, validMoves, board, myColor]);

  return {
    socket,
    roomId,
    myPlayerId,
    myColor,
    board,
    currentTurn,
    players,
    selectedPiece,
    validMoves,
    lastMove,
    gameOver,
    gameResult,
    afkWarning,
    isMyTurn,
    handleCellPress,
    gameState: gameOver ? 'ended' : 'playing',
    resetGame: () => {
      setGameOver(false);
      setGameResult(null);
      setBoard(Array(64).fill(null));
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };
}