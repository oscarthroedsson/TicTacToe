const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  return { board };
})();

const displayController = (() => {
  const renderGame = () => {
    const gameContainer = document.getElementById("gameBoard");
    for (let i = 0; i < gameBoard.board.length; i++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("gridItem");
      gridItem.dataset.index = i;
      gridItem.addEventListener("click", (e) => {
        const clickedIndex = e.target.dataset.index;
        gameLogic.makeMove(clickedIndex);
        gridItem.textContent = gameBoard.board[i];
      });
      gameContainer.appendChild(gridItem);
    }
  };
  return { renderGame };
})();

const playerFactory = (marker) => {
  return { marker: marker };
};

const gameLogic = (() => {
  displayController.renderGame();
  const playerX = playerFactory("x");
  const playerO = playerFactory("o");
  let winner = "";
  let gameGoing = true;

  let whosTurn = "x";
  const makeMove = (index) => {
    gameBoard.board.splice(index, 1, whosTurn);
    checkWinner();
    if (whosTurn === "x") {
      whosTurn = "o";
    } else {
      whosTurn = "x";
    }
  };

  const checkWinner = () => {
    const winningMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningMoves.length; i++) {
      //vill in i index 0
      const combo = winningMoves[i];

      if (
        gameBoard.board[combo[0]] === whosTurn &&
        gameBoard.board[combo[1]] === whosTurn &&
        gameBoard.board[combo[2]] === whosTurn
      ) {
        winner = whosTurn;
        gameGoing = false;
      }
    }
  };

  return { makeMove, winner };
})();
