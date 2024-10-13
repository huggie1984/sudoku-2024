import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';
import { PuzzleType } from '../../types/types';
import { createPuzzle } from '../../scripts/puzzle-generator/puzzle-generator';

const STORAGE_KEY = 'mhuggs-sudoku';

interface PuzzleContextProps {
  puzzle: PuzzleType | null;
  createAndSaveNewPuzzle: ({
    difficulty = 40,
  }: {
    difficulty: 40 | 50 | 60;
  }) => void;
  setPuzzle: Dispatch<SetStateAction<PuzzleType | null>>;
  savePuzzle: (updatedPuzzle: PuzzleType) => void;
}

const PuzzleContext = createContext<PuzzleContextProps | undefined>(undefined);

interface PuzzleProviderProps {
  children: ReactNode;
}

export const PuzzleProvider: React.FC<PuzzleProviderProps> = ({ children }) => {
  const [puzzle, setPuzzle] = useState<PuzzleType | null>(null);

  useEffect(() => {
    const savedPuzzle = localStorage.getItem(STORAGE_KEY);
    if (savedPuzzle) {
      setPuzzle(JSON.parse(savedPuzzle));
    }
  }, []);

  const savePuzzle = (updatedPuzzle: PuzzleType) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPuzzle));

  const createAndSaveNewPuzzle = ({
    difficulty = 40,
  }: {
    difficulty: 40 | 50 | 60;
  }) => {
    const newPuzzle = createPuzzle(difficulty);
    setPuzzle(newPuzzle);
    savePuzzle(newPuzzle);
  };

  return (
    <PuzzleContext.Provider
      value={{ puzzle, createAndSaveNewPuzzle, setPuzzle, savePuzzle }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => {
  const context = React.useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzle must be used within a PuzzleProvider');
  }
  return context;
};
