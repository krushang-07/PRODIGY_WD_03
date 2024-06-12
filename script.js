document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const resetButton = document.getElementById("reset");
  const message = document.getElementById("message");
  let board = Array(9).fill(null);
  let currentPlayer = "X";
  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleCellClick = (e) => {
    const index = e.target.getAttribute("data-index");
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
      message.textContent = `${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

    if (board.every((cell) => cell)) {
      message.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  const checkWin = () => {
    return winningConditions.some((condition) => {
      const [a, b, c] = condition;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  };

  const resetGame = () => {
    board.fill(null);
    cells.forEach((cell) => (cell.textContent = ""));
    currentPlayer = "X";
    gameActive = true;
    message.textContent = "";
  };

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", resetGame);
});
