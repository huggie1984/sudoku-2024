import { ChangeEvent } from 'react';
import {
  getUserInputCells,
  gridValidator,
} from '../../scripts/puzzle-validator/puzzle-validator';
import { usePuzzle } from '../../contexts/puzzle-context/puzzle-context';
import { Link } from 'react-router-dom';

export const PuzzlePage = () => {
  const { puzzle, setPuzzle, savePuzzle } = usePuzzle();

  const onCellChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const [row, col] = id.split('_').map(Number);

    setPuzzle((prevPuzzle) => {
      const updatedPuzzle = [...prevPuzzle!];
      updatedPuzzle[row][col] = {
        ...updatedPuzzle[row][col],
        value: value ? parseInt(value) : 0,
      };
      savePuzzle(updatedPuzzle);
      return updatedPuzzle;
    });
  };

  const validate = () => {
    const userCells = getUserInputCells(puzzle!);

    setPuzzle((prevPuzzle) => {
      const updatedPuzzle = [...prevPuzzle!];
      let isValid = true;
      for (let i = 0; i < userCells.length; i++) {
        let cell = userCells[i];
        isValid = gridValidator(cell, prevPuzzle!);
        updatedPuzzle[cell.row][cell.col] = {
          ...updatedPuzzle[cell.row][cell.col],
          isHighlighted: !isValid,
        };
      }
      savePuzzle(updatedPuzzle);
      return updatedPuzzle;
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-2">
      <div className="flex flex-col items-center gap-4">
        <section className="flex w-full justify-between">
          <Link
            className="flex items-center gap-2 self-start rounded p-2 text-xl"
            to="/home"
          >
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <style>{`.cls-1 { fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 20px; }`}</style>
              </defs>
              <g data-name="Layer 2" id="Layer_2">
                <g
                  data-name="E421, Back, buttons, multimedia, play, stop"
                  id="E421_Back_buttons_multimedia_play_stop"
                >
                  <circle className="cls-1" cx="256" cy="256" r="246" />
                  <line
                    className="cls-1"
                    x1="352.26"
                    x2="170.43"
                    y1="256"
                    y2="256"
                  />
                  <polyline
                    className="cls-1"
                    points="223.91 202.52 170.44 256 223.91 309.48"
                  />
                </g>
              </g>
            </svg>{' '}
            BACK
          </Link>
          <button
            className="rounded bg-cyan-700 p-4 text-amber-50"
            onClick={validate}
          >
            Validate
          </button>
        </section>

        {/* Bottom section */}
        <section>
          {puzzle &&
            puzzle.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex h-[40px] sm:h-[50px] ${
                  rowIndex % 3 === 0 ? 'border-t-[3px]' : ''
                } ${rowIndex === 8 ? 'border-b-[3px]' : ''}`}
              >
                {row.map((cell) => (
                  <div
                    key={cell.row + '_' + cell.col}
                    className={`flex w-[40px] bg-cyan-700 p-0 sm:w-[50px] ${
                      cell.col % 3 === 0 ? 'border-l-[3px]' : 'border'
                    } ${cell.col === 8 ? 'border-r-[3px]' : 'border'}`}
                  >
                    <input
                      className={`box-border flex h-full w-full appearance-none rounded-none border-none bg-[#fffce8] text-center text-xl text-[#040203] shadow-none disabled:bg-[#fbf6d7] ${
                        cell.isHighlighted ? 'text-red-500' : ''
                      }`}
                      id={cell.row + '_' + cell.col}
                      onChange={(event) => onCellChange(event)}
                      style={{ boxSizing: 'border-box' }}
                      disabled={cell.isDisabled}
                      value={cell.value > 0 ? cell.value : ''}
                    />
                  </div>
                ))}
              </div>
            ))}
        </section>
      </div>
    </main>
  );
};
