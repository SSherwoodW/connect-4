/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const width = 7; //using x for width
const height = 6; //using y for height

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let y = 0; y < height; y++){
    board.push(Array(width)) //for each unit of 'height', add a new array of 'width' indices to board. This creates a matrix 6 values high x 7 values wide.
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  let htmlBoard = document.getElementById('board');

  // create a row with id of column-top and add evt listener that performs a function 'handleClick' when user clicks on the row.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < width; x++) {//for 'width' values, do the following:
    let headCell = document.createElement("td"); //create table data cells
    headCell.setAttribute("id", x); //ID each table data cell
    top.append(headCell); //add these 7 table data cells to '
  }
  htmlBoard.append(top); //append top row to htmlBoard.

  // TODO: add comment for this code
  for (let y = 0; y < height; y++) { 
    const row = document.createElement("tr");//for 'height' number, create new table rows (6)
    for (let x = 0; x < width; x++) {
      var cell = document.createElement("td"); //for 'width' number, create new table data cells (6)
      cell.setAttribute("id", `${y}-${x}`); //give id of height-width(y-x) to new td cells
      row.append(cell);//append TD cells to new 6 TRs.
    }
    htmlBoard.append(row); //append rows to html board.
  }
}
/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for(let y = height - 1; y >= 0; y--){
    if(!board[y][x]){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`P${currPlayer}`);

  let slot = document.getElementById(`${y}-${x}`)
  slot.append(piece); 
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;   //add line to update in-memory board
  placeInTable(y,x);


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  //check for tie
if(board.every(function(row){
  row.every(function(cell){
    cell == true;
  })
})) return endGame(`Tie!`); //This doesn't work.

// if(board.every((row) => row.every((cell) => cell))) {
//   return endGame('Tie!')
// }  //this also doesn't work.

  // switch players
  // TODO: switch currPlayer 1 <-> 2
 currPlayer = currPlayer === 1 ? 2 : 1;
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */


function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
