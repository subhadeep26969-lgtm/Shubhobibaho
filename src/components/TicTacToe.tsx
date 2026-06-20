import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, User, Cpu } from 'lucide-react';

type BoardState = (string | null)[];

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [vsComputer, setVsComputer] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);

  // Calculate winner based on current board
  const checkWinner = useCallback((currentBoard: BoardState) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: lines[i] };
      }
    }
    return null;
  }, []);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningCells(winResult.line);
    } else if (newBoard.every((cell) => cell !== null)) {
      setWinner('Draw');
    } else {
      setIsXNext(!isXNext);
    }
  };

  // Basic Computer AI (Medium difficulty: blocks wins or wins if possible, else takes center or corner)
  const getComputerMove = useCallback((currentBoard: BoardState): number => {
    const emptyCells = currentBoard
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((val): val is number => val !== null);

    // 1. Can computer ('O') win right now?
    for (const cell of emptyCells) {
      const testBoard = [...currentBoard];
      testBoard[cell] = 'O';
      if (checkWinner(testBoard)?.winner === 'O') return cell;
    }

    // 2. Can opponent ('X') win right now? Block it!
    for (const cell of emptyCells) {
      const testBoard = [...currentBoard];
      testBoard[cell] = 'X';
      if (checkWinner(testBoard)?.winner === 'X') return cell;
    }

    // 3. Take center if empty
    if (emptyCells.includes(4)) return 4;

    // 4. Take corners if empty
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((c) => emptyCells.includes(c));
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // 5. Take random
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }, [checkWinner]);

  useEffect(() => {
    if (vsComputer && !isXNext && !winner) {
      const timer = setTimeout(() => {
        const cpuMove = getComputerMove(board);
        if (cpuMove !== undefined) {
          const newBoard = [...board];
          newBoard[cpuMove] = 'O';
          setBoard(newBoard);

          const winResult = checkWinner(newBoard);
          if (winResult) {
            setWinner(winResult.winner);
            setWinningCells(winResult.line);
          } else if (newBoard.every((cell) => cell !== null)) {
            setWinner('Draw');
          } else {
            setIsXNext(true);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [vsComputer, isXNext, board, winner, getComputerMove, checkWinner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningCells([]);
  };

  return (
    <div className="max-w-md mx-auto bg-stone-50 border-2 border-amber-800/20 p-5 rounded-2xl shadow-sm relative">
      <div className="absolute top-0 right-0 bg-red-900 text-amber-50 text-[10px] px-3 py-1 font-bold rounded-bl-lg uppercase tracking-wider">
        Tic-Tac-Toe
      </div>

      <div className="text-center mb-5">
        <h4 className="font-serif text-xl text-red-950 font-bold mb-1">
          কাটাকুটি খেলা (Tic-Tac-Toe)
        </h4>
        <p className="text-stone-600 text-xs">
          বিয়েবাড়ির অলস দুপুরে রোমাঞ্চকর কাটাকুটি লড়াই!
        </p>

        {/* Mode Selector */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => {
              setVsComputer(true);
              resetGame();
            }}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${
              vsComputer 
                ? 'bg-red-800 text-white border-red-800' 
                : 'bg-white text-stone-700 border-stone-200'
            }`}
            id="vs-cpu-btn"
            type="button"
          >
            <Cpu className="h-3.5 w-3.5" /> কম্পিউটারের সাথে
          </button>
          <button
            onClick={() => {
              setVsComputer(false);
              resetGame();
            }}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${
              !vsComputer 
                ? 'bg-red-800 text-white border-red-800' 
                : 'bg-white text-stone-700 border-stone-200'
            }`}
            id="vs-friend-btn"
            type="button"
          >
            <User className="h-3.5 w-3.5" /> বন্ধুর সাথে
          </button>
        </div>
      </div>

      {/* Board Layout */}
      <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto mt-4">
        {board.map((cell, idx) => {
          const isWinning = winningCells.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              disabled={cell !== null || winner !== null || (vsComputer && !isXNext)}
              className={`h-[72px] w-[72px] mx-auto text-3xl rounded-xl transition-all font-serif font-bold flex items-center justify-center border-2 ${
                isWinning
                  ? 'bg-amber-100 border-yellow-500 text-yellow-600 scale-105'
                  : 'bg-white border-stone-200 text-stone-800 active:bg-stone-100'
              } cursor-pointer`}
              id={`tictactoe-cell-${idx}`}
              type="button"
            >
              <span className={cell === 'X' ? 'text-red-800' : 'text-amber-600'}>
                {cell}
              </span>
            </button>
          );
        })}
      </div>

      {/* Game Status */}
      <div className="text-center mt-6">
        {winner ? (
          <div className="mb-4">
            {winner === 'Draw' ? (
              <p className="text-sm font-semibold text-stone-700">খেলা ড্র হয়েছে! 🤝</p>
            ) : (
              <p className="text-sm font-bold text-emerald-800 emoji-celebration">
                🎉 {vsComputer && winner === 'O' ? "কম্পিউটার জিতেছে!" : `বিজেতা: '${winner}'`}!
              </p>
            )}
          </div>
        ) : (
          <p className="text-xs text-stone-500 mb-4">
             {isXNext ? "'X' এর চাল" : "'O' এর চাল"}
          </p>
        )}

        <button
          onClick={resetGame}
          className="inline-flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs px-4 py-2 rounded-lg font-medium transition-colors"
          id="tictactoe-reset-btn"
          type="button"
        >
          <RefreshCw className="h-3.5 w-3.5" /> পুনরায় শুরু করুন
        </button>
      </div>
    </div>
  );
};
