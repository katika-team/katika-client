import { useEffect, useState, useCallback, useRef } from 'react';
import { useSession, useSocket } from '@beta-gamer/react-native';

export interface Card {
  id: string;
  rank: string;
  suit: string;
  isJoker: boolean;
}

export function useChkobeGame() {
  const socket = useSocket();
  const session = useSession();
  const myPlayer = session.players[0];
  const tokenPlayerId = myPlayer?.id ?? '';

  const [roomId, setRoomId] = useState<string | null>(null);
  const [myPlayerId, setMyPlayerId] = useState(tokenPlayerId);
  const [hand, setHand] = useState<Card[]>([]);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<{ winner: string | null; reason: string } | null>(null);
  const [activeSuit, setActiveSuit] = useState<string | null>(null);
  const [pendingPickup, setPendingPickup] = useState<number>(0);

  const isMyTurn = players.length > 0 && players[currentTurn]?.id === myPlayerId;

  useEffect(() => {
    if (!socket) return;

    const join = () => {
      console.log('Joining chkobe matchmaking...');
      socket.emit('matchmaking:join', {
        username: myPlayer?.displayName || 'Player',
        playerId: tokenPlayerId,
        wantsBot: true,
        botDifficulty: 'easy',
        minPlayers: 4, // Force 4-player game with bots
        maxPlayers: 4,  
      });
    };

    if (socket.connected) {
      console.log('Socket connected, joining...');
      join();
    } else {
      console.log('Socket not connected, waiting...');
      socket.once('connect', join);
    }

    socket.on('game:started', (d: any) => {
      console.log('Chkobe game started:', d);
      setRoomId(d.roomId);
      setMyPlayerId(d.playerId);
      setHand(d.hand || []);
      setDiscardPile(d.discardPile || []);
      setCurrentTurn(d.currentTurn ?? 0);
      setPlayers(d.players || []);
      setActiveSuit(d.activeSuit || null);
      setPendingPickup(d.pendingPickup?.total || 0);
    });

    socket.on('matchmaking:waiting', (d: any) => {
      console.log('Chkobe matchmaking waiting:', d);
    });

    socket.on('error', (d: any) => {
      console.log('Chkobe socket error:', d);
    });

    socket.on('game:move:made', (d: any) => {
      console.log('Chkobe move made:', d);
      if (d.hand) setHand(d.hand);
      if (d.discardPile) setDiscardPile(d.discardPile);
      setCurrentTurn(d.currentTurn ?? 0);
      setActiveSuit(d.activeSuit || null);
      setPendingPickup(d.pendingPickup?.total || 0);
    });

    socket.on('game:over', (d: { winner?: string; reason: string }) => {
      console.log('Chkobe game over:', d);
      const result = { winner: d.winner ?? null, reason: d.reason };
      setGameResult(result);
      setTimeout(() => setGameOver(true), 400);
    });

    return () => {
      socket.off('connect', join);
      socket.off('game:started');
      socket.off('matchmaking:waiting');
      socket.off('error');
      socket.off('game:move:made');
      socket.off('game:over');
    };
  }, [socket, myPlayer?.displayName, tokenPlayerId]);

  const playCard = useCallback((cardId: string) => {
    if (!socket || !roomId || !myPlayerId || gameOver || !isMyTurn) return;

    console.log('Playing card:', cardId);
    socket.emit('game:move', { 
      roomId, 
      playerId: myPlayerId, 
      cardId
    });
  }, [socket, roomId, myPlayerId, gameOver, isMyTurn]);

  const drawCard = useCallback(() => {
    if (!socket || !roomId || !myPlayerId || gameOver || !isMyTurn) return;

    console.log('Drawing card');
    socket.emit('game:draw', { 
      roomId, 
      playerId: myPlayerId
    });
  }, [socket, roomId, myPlayerId, gameOver, isMyTurn]);

  return {
    socket,
    roomId,
    myPlayerId,
    hand,
    discardPile,
    currentTurn,
    players,
    gameOver,
    gameResult,
    activeSuit,
    pendingPickup,
    isMyTurn,
    playCard,
    drawCard,
    gameState: gameOver ? 'ended' : 'playing',
    resetGame: () => {
      setGameOver(false);
      setGameResult(null);
      setHand([]);
      setDiscardPile([]);
      setPendingPickup(0);
    }
  };
}