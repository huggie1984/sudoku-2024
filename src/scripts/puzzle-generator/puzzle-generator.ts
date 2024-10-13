import { GridRefsType, PuzzleCellType, PuzzleType } from '../../types/types';
import {
  backTrack,
  isColValid,
  isRowValid,
} from '../puzzle-validator/puzzle-validator';

const ROWS = 9;
const COLS = 9;

// Main function to create the puzzle
export const createPuzzle = (difficulty: number): PuzzleType => {
  let values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const puzzle = puzzleGrid();

  while (values.length > 0) {
    populatePuzzle(puzzle, values, values.shift());
  }

  setDifficulty(puzzle, difficulty);
  return puzzle;
};

// Helper function to create an empty puzzle grid
const puzzleGrid = (): PuzzleType => {
  const puzzle: PuzzleType = [];

  for (let row = 0; row < ROWS; row++) {
    const rowArray: PuzzleCellType[] = [];

    for (let col = 0; col < COLS; col++) {
      const gridRow = Math.floor(row / 3);
      const gridCol = Math.floor(col / 3);
      const gridIndex = gridRow * 3 + gridCol;

      rowArray.push({
        isDisabled: true,
        isHighlighted: false,
        row,
        col,
        id: `${row}_${col}`, // Template literal for id
        grid: gridIndex,
        value: 0,
      } as PuzzleCellType);
    }

    puzzle.push(rowArray);
  }

  return puzzle;
};

// Function to set the puzzle's difficulty by removing numbers
const setDifficulty = (puzzle: PuzzleType, difficulty: number): void => {
  let _difficulty = difficulty;

  while (_difficulty > 0) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);

    if (puzzle[row][col].value === 0) continue;

    puzzle[row][col].value = 0;
    puzzle[row][col].isDisabled = false;
    _difficulty--;
  }
};

// Function to reference sections of the grid by 3x3 blocks
const gridSectionRef = (puzzle: PuzzleType): GridRefsType => {
  const _gridsRef: GridRefsType = Array.from({ length: 9 }, () => []);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const gridRow = Math.floor(r / 3);
      const gridCol = Math.floor(c / 3);
      const gridIndex = gridRow * 3 + gridCol;

      _gridsRef[gridIndex].push(puzzle[r][c]);
    }
  }

  return _gridsRef;
};

// Function to populate the puzzle grid
const populatePuzzle = (
  puzzle: PuzzleType,
  values: number[],
  value: number | undefined
): PuzzleType | void => {
  if (value === undefined) return;

  const _gridsRef = gridSectionRef(puzzle);

  for (let g = 0; g < 9; g++) {
    let loop = true;
    let elements = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    while (loop) {
      if (elements.length === 0) {
        return backTrack(value, puzzle, values);
      }

      const element = elements[Math.floor(Math.random() * elements.length)];
      const item = _gridsRef[g][element];
      const index = elements.indexOf(element);

      if (item.value > 0) {
        elements.splice(index, 1);
        continue;
      }

      const rowValid = isRowValid(item.row, value, puzzle);
      const colValid = isColValid(item.col, value, puzzle);

      if (rowValid && colValid) {
        puzzle[item.row][item.col].value = value;
        loop = false;
      } else {
        elements.splice(index, 1);
      }
    }
  }
};
