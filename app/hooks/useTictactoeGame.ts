import { useEffect, useState, useCallback, useRef } from 'react';
import { useSession, useSocket } from '@beta-gamer/react-native';

type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[];

export function useTictactoeGame() {
  const socket = useSocket();
  const session = useSession();
  const myPlayer = session.players[0];
  const tokenPlayerId = myPlayer?.id ?? '';

  const [roomId, setRoomId] = useState<string | null>(null);
  const [myPlayerId, setMyPlayerId] = useState(tokenPlayerId);
  const [mySymbol, setMySymbol] = useState<Player>('X');
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<{ winner: string | null; reason: string } | null>(null);
  const [afkWarning, setAfkWarning] = useState<{ playerId: string; secondsRemaining: number } | null>(null);

  const afkCountdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const roomIdRef = useRef<string | null>(null);

  const isMyTurn = players.length > 0 && players[currentTurn]?.id === myPlayerId;

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
      console.log('Game started event:', d);
      setRoomId(d.roomId);
      roomIdRef.current = d.roomId;
      setMyPlayerId(d.playerId);
      setMySymbol(d.symbol || 'X');
      setBoard(d.board || Array(9).fill(null));
      setCurrentTurn(d.currentTurn ?? 0);
      setPlayers(d.players || []);
    });

    socket.on('game:move:made', (d: any) => {
      console.log('Move made received:', d);
      if (d.board) {
        console.log('Updating board to:', d.board);
        setBoard(d.board);
      }
      setCurrentTurn(d.currentTurn ?? 0);
      setAfkWarning(null);
      if (afkCountdownRef.current) {
        clearInterval(afkCountdownRef.current);
        afkCountdownRef.current = null;
      }
    });

    socket.on('tictactoe:afk_warning', (d: { playerId: string; secondsRemaining: number }) => {
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

    socket.on('tictactoe:afk_warning_cleared', () => {
      if (afkCountdownRef.current) {
        clearInterval(afkCountdownRef.current);
        afkCountdownRef.current = null;
      }
      setAfkWarning(null);
    });

    socket.on('game:over', (d: { winner?: string; reason: string }) => {
      console.log('Game over event:', d);
      const result = { winner: d.winner ?? null, reason: d.reason };
      setGameResult(result);
      setTimeout(() => setGameOver(true), 400);
      // gameover
    });

    // Listen for any socket events to debug
    const originalEmit = socket.emit;
    const originalOn = socket.on;
    
    socket.on = function(event: string, callback: any) {
      console.log('Listening for event:', event);
      return originalOn.call(this, event, (...args: any[]) => {
        console.log('Received event:', event, args);
        return callback(...args);
      });
    };

    return () => {
      socket.off('connect', join);
      socket.off('game:started');
      socket.off('game:move:made');
      socket.off('tictactoe:afk_warning');
      socket.off('tictactoe:afk_warning_cleared');
      socket.off('game:over');
      if (afkCountdownRef.current) clearInterval(afkCountdownRef.current);
    };
  }, [socket, myPlayer?.displayName, tokenPlayerId]);

  const handleCellPress = useCallback((position: number) => {
    console.log('handleCellPress called:', {
      position,
      socket: !!socket,
      roomId,
      myPlayerId,
      gameOver,
      isMyTurn,
      boardCell: board[position]
    });
    
    if (!socket || !roomId || !myPlayerId || gameOver || !isMyTurn || board[position]) {
      console.log('Move blocked:', {
        noSocket: !socket,
        noRoomId: !roomId,
        noPlayerId: !myPlayerId,
        gameOver,
        notMyTurn: !isMyTurn,
        cellOccupied: !!board[position]
      });
      return;
    }

    console.log('Emitting move:', { roomId, playerId: myPlayerId, position });
    socket.emit('game:move', { 
      roomId, 
      playerId: myPlayerId, 
      position
    });
  }, [socket, roomId, myPlayerId, gameOver, isMyTurn, board, mySymbol]);

  return {
    socket,
    roomId,
    myPlayerId,
    mySymbol,
    board,
    currentTurn,
    players,
    gameOver,
    gameResult,
    afkWarning,
    isMyTurn,
    handleCellPress,
    gameState: gameOver ? 'ended' : 'playing'
  };
}