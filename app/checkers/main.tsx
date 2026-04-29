import React from "react";
import SessionProvider from "../components/SessionProvider";
import GameLayout from "../components/GameLayout";
import { useCheckersGame } from "../hooks/useCheckersGame";
import CustomCheckersBoard from "../component/CustomCheckersBoard";
import GamePlay from "../component/GamePlay";

function CheckersGame() {
  const {
    board,
    selectedPiece,
    validMoves,
    lastMove,
    isMyTurn,
    myColor,
    handleCellPress
  } = useCheckersGame();

  return (
    <GameLayout
      topPlayer={{
        name: "John Doe",
        region: "Cameroon",
        rank: "Beginner",
        score: 20,
        pieces: 6
      }}
      bottomPlayer={{
        name: "John Doe",
        region: "Cameroon", 
        rank: "Beginner",
        score: 20,
        pieces: 6
      }}
      gameStats={{
        time: "12:10",
        coins: 2000
      }}
    >
      <CustomCheckersBoard
        board={board}
        selectedPiece={selectedPiece}
        validMoves={validMoves}
        lastMove={lastMove}
        onCellPress={handleCellPress}
        isMyTurn={isMyTurn}
        myColor={myColor}
        style={{
          borderRadius: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      />
      <GamePlay />
    </GameLayout>
  );
}

export default function Main() {
  return (
    <SessionProvider>
      <CheckersGame />
    </SessionProvider>
  );
}