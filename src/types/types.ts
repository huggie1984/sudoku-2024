export type PuzzleCellType = {
  isDisabled: boolean;
  isHighlighted: boolean;
  row: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  col: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  id: string;
  grid: number;
  value: number;
};

export type PuzzleType = PuzzleCellType[][];

export type GridRefsType = PuzzleCellType[][];
