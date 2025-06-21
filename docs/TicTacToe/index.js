const board = document.getElementById("board");
let currentPlayer = "X";
const rows = Array(3).fill(0);
const cols = Array(3).fill(0);
let diag = 0;
let antiDiag = 0;

const makeMove = (event) => {
  const target = event.target;
  const row = target.dataset.row;
  const col = target.dataset.col;
  if (target.innerText === "") {
    target.innerText = currentPlayer;
    rows[row] += currentPlayer === "X" ? 1 : -1;
    cols[col] += currentPlayer === "X" ? 1 : -1;
    if (row === col) {
      diag += currentPlayer === "X" ? 1 : -1;
    }
    if (Number(row) + Number(col) === 2) {
      antiDiag += currentPlayer === "X" ? 1 : -1;
    }
    if (
      Math.abs(rows[row]) === 3 ||
      Math.abs(cols[col]) === 3 ||
      Math.abs(diag) === 3 ||
      Math.abs(antiDiag) === 3
    ) {
      setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        board.style.pointerEvents = "none";
      }, 100); // Delay to allow DOM update
    } else if (
      Array.from(document.querySelectorAll(".cell")).every(
        (cell) => cell.innerText !== ""
      )
    ) {
      setTimeout(() => {
        alert("It's a draw!");
      }, 100); // Delay to allow DOM update
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
};

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement("div");
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.classList.add("cell");
    cell.addEventListener("click", makeMove);
    board.appendChild(cell);
  }
}

const resetBoard = () => {
  const text = document.querySelectorAll(".cell");
  text.forEach((cell) => (cell.innerText = ""));
  currentPlayer = "X";
  rows.fill(0);
  cols.fill(0);
  diag = 0;
  antiDiag = 0;
  board.style.pointerEvents = "auto";
};
