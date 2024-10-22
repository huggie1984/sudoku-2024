import { Link } from 'react-router-dom';
import { usePuzzle } from '../../contexts/puzzle-context/puzzle-context';

export const HomePage = () => {
  const { puzzle, createAndSaveNewPuzzle } = usePuzzle();
  // check storage for an old puzzle or start a new puzzle.
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-20 p-2">
      <h1 className="text-6xl font-black text-blue-950 md:text-8xl">SUDOKU</h1>
      <div className="flex items-center gap-4">
        <Link
          onClick={() => createAndSaveNewPuzzle({ difficulty: 50 })}
          className="rounded bg-cyan-700 p-4 text-xl text-amber-50 md:p-8 md:text-3xl"
          to="/puzzle"
        >
          New Game
        </Link>

        {puzzle && (
          <>
            or{' '}
            <Link
              className="rounded bg-cyan-700 p-4 text-xl text-amber-50 md:p-8 md:text-3xl"
              to="/puzzle"
            >
              Continue Game
            </Link>
          </>
        )}
      </div>
    </main>
  );
};
