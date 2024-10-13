import { PuzzleCellType, PuzzleType } from '../../types/types';

const ROWS = 9;
const COLS = 9;

export const backTrack = (
  value: number,
  puzzle: PuzzleType,
  values: number[]
): void => {
  let currentValue = value;
  let previousValue = value - 1;

  for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[row].length; col++) {
      if (
        puzzle[row][col].value !== currentValue &&
        puzzle[row][col].value !== previousValue
      )
        continue;

      puzzle[row][col].value = 0;
    }
  }

  values.unshift(previousValue, currentValue);
};

// Validate if a value can be placed in a given row
export const isRowValid = (
  row: number,
  value: number,
  puzzle: PuzzleType
): boolean => {
  for (let c = 0; c < COLS; c++) {
    if (value === puzzle[row][c].value) return false;
  }
  return true;
};

// Validate if a value can be placed in a given column
export const isColValid = (
  col: number,
  value: number,
  puzzle: PuzzleType
): boolean => {
  for (let r = 0; r < ROWS; r++) {
    if (value === puzzle[r][col].value) return false;
  }
  return true;
};

export const getUserInputCells = (puzzle: PuzzleType) =>
  puzzle.flatMap((row) =>
    row.filter((cell) => !cell.isDisabled && cell.value > 0)
  );

const rowValidation = (cell: PuzzleCellType, puzzle: PuzzleType) => {
  let row = cell.row;
  for (let col = 0; col < 9; col++) {
    const gridItem = puzzle[row][col];
    if (cell.id === gridItem.id) continue;
    if (cell.value === gridItem.value) {
      return false;
    }
  }
  return true;
};

const colValidation = (cell: PuzzleCellType, puzzle: PuzzleType) => {
  const col = cell.col;
  for (let row = 0; row < 9; row++) {
    const gridItem = puzzle[row][col];
    if (cell.id === gridItem.id || gridItem.value === 0) continue;
    if (cell.value === gridItem.value) {
      return false;
    }
  }
  return true;
};

const gridValidation = (cell: PuzzleCellType, puzzle: PuzzleType): boolean => {
  const col = cell.col;
  const row = cell.row;

  // Initialize min and max values
  let minCol: number = 0;
  let maxCol: number = 3;
  let minRow: number = 0;
  let maxRow: number = 3;

  // Determine column range
  if (col >= 3 && col < 6) {
    minCol = 3;
    maxCol = 6;
  } else if (col >= 6) {
    minCol = 6;
    maxCol = 9;
  }

  // Determine row range
  if (row >= 3 && row < 6) {
    minRow = 3;
    maxRow = 6;
  } else if (row >= 6) {
    minRow = 6;
    maxRow = 9;
  }

  // Validate the grid
  for (let i = minRow; i < maxRow; i++) {
    for (let j = minCol; j < maxCol; j++) {
      const gridItem = puzzle[i][j];
      if (cell.id === gridItem.id || gridItem.value === 0) continue;
      if (cell.value === gridItem.value) {
        return false;
      }
    }
  }

  return true;
};

export const gridValidator = (cell: PuzzleCellType, puzzle: PuzzleType) => {
  const isRowValid = rowValidation(cell, puzzle);
  const isColValid = colValidation(cell, puzzle);
  const isGridValid = gridValidation(cell, puzzle);
  const isNumberValid = cell.value > 0 && cell.value < 10;
  return !(!isRowValid || !isColValid || !isGridValid || !isNumberValid);
};
