const board = document.getElementById("board");
let currentPlayer = "X";
let cells = [];
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] !== "" && cells[a] === cells[b] && cells[b] === cells[c]) {
      alert(`Player ${cells[a]} wins!`);
      resetBoard();
      return;
    }
  }
  if (!cells.includes("")) {
    alert(`It's draw!`);
    resetBoard();
  }
};

const makeMove = (event) => {
  const target = event.target;
  const index = target.dataset.index;
  if (target.innerText === "") {
    target.innerText = currentPlayer;
    cells[index] = currentPlayer;
    setTimeout(() => {
      checkWinner();
    }, 100);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.dataset.index = i;
  cell.classList.add("cell");
  cell.addEventListener("click", makeMove);
  cells.push("");
  board.appendChild(cell);
}

const resetBoard = () => {
  const text = document.querySelectorAll(".cell");
  text.forEach((cell) => (cell.innerText = ""));
  cells = cells.map((_) => "");
  currentPlayer = "X";
};
