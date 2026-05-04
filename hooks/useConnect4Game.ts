import { useEffect, useState, useCallback, useRef } from 'react';
import { useSession, useSocket } from '@beta-gamer/react-native';

type Player = 'red' | 'yellow';
type Cell = Player | null;
type Board = Cell[]; // 1D array like beta-gamer

export function useConnect4Game() {
  const socket = useSocket();
  const session = useSession();
  const myPlayer = session.players[0];
  const tokenPlayerId = myPlayer?.id ?? '';

  const [roomId, setRoomId] = useState<string | null>(null);
  const [myPlayerId, setMyPlayerId] = useState(tokenPlayerId);
  const [myColor, setMyColor] = useState<Player>('red');
  const [board, setBoard] = useState<Board>(() => Array(42).fill(null)); // 6x7 = 42
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<{ winner: string | null; reason: string } | null>(null);
  const [afkWarning, setAfkWarning] = useState<{ playerId: string; secondsRemaining: number } | null>(null);

  const afkCountdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const roomIdRef = useRef<string | null>(null);

  const isMyTurn = players.length > 0 && players[currentTurn]?.id === myPlayerId;

  // Helper functions like beta-gamer
  const getPosition = (row: number, col: number): number => row * 7 + col;
  const getRowCol = (position: number): { row: number; col: number } => ({
    row: Math.floor(position / 7),
    col: position % 7,
  });

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
      console.log('Connect4 game started:', d);
      setRoomId(d.roomId);
      roomIdRef.current = d.roomId;
      setMyPlayerId(d.playerId);
      setMyColor(d.color || 'red');
      setBoard(d.board || Array(42).fill(null));
      setCurrentTurn(d.currentTurn ?? 0);
      setPlayers(d.players || []);
    });

    socket.on('game:move:made', (d: any) => {
      console.log('Connect4 move made:', d);
      if (d.board && Array.isArray(d.board)) {
        setBoard(d.board);
      }
      setCurrentTurn(d.currentTurn ?? 0);
      setAfkWarning(null);
      if (afkCountdownRef.current) {
        clearInterval(afkCountdownRef.current);
        afkCountdownRef.current = null;
      }
    });

    socket.on('connect4:afk_warning', (d: { playerId: string; secondsRemaining: number }) => {
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

    socket.on('connect4:afk_warning_cleared', () => {
      if (afkCountdownRef.current) {
        clearInterval(afkCountdownRef.current);
        afkCountdownRef.current = null;
      }
      setAfkWarning(null);
    });

    socket.on('game:over', (d: { winner?: string; reason: string }) => {
      console.log('Connect4 game over:', d);
      const result = { winner: d.winner ?? null, reason: d.reason };
      setGameResult(result);
      setTimeout(() => setGameOver(true), 400);
    });

    return () => {
      socket.off('connect', join);
      socket.off('game:started');
      socket.off('game:move:made');
      socket.off('connect4:afk_warning');
      socket.off('connect4:afk_warning_cleared');
      socket.off('game:over');
      if (afkCountdownRef.current) clearInterval(afkCountdownRef.current);
    };
  }, [socket, myPlayer?.displayName, tokenPlayerId]);

  const handleColumnPress = useCallback((column: number) => {
    console.log('Connect4 column pressed:', {
      column,
      socket: !!socket,
      roomId,
      myPlayerId,
      gameOver,
      isMyTurn
    });
    
    if (!socket || !roomId || !myPlayerId || gameOver || !isMyTurn) {
      console.log('Connect4 move blocked');
      return;
    }

    console.log('Emitting Connect4 move:', { roomId, playerId: myPlayerId, column });
    socket.emit('game:move', { 
      roomId, 
      playerId: myPlayerId, 
      column
    });
  }, [socket, roomId, myPlayerId, gameOver, isMyTurn]);

  return {
    socket,
    roomId,
    myPlayerId,
    myColor,
    board,
    currentTurn,
    players,
    gameOver,
    gameResult,
    afkWarning,
    isMyTurn,
    handleColumnPress,
    gameState: gameOver ? 'ended' : 'playing',
    getPosition,
    getRowCol,
    resetGame: () => {
      setGameOver(false);
      setGameResult(null);
      setBoard(Array(42).fill(null));
    }
  };
}