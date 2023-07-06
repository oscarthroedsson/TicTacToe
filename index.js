//BEHÖVER LÖSA OAVGJORT SKA SYNAS PÅ SCOREBOARDEN
// VI KANSKE BÖR LÄGGA ALL LOGIK SOM HAR MED SCOREBOARDEN I SAMMA FUNKTION.
// DÄREMOT UPPDATERA SCOREBOARDEN I DISPLAYCONTROLLER.

// -------------------- The gameboard --------------------
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  return { board };
})();
// -------------------- Set-ups everything visual --------------------
const displayController = (() => {
  const contentContainer = document.getElementById("contentContainer");
  contentContainer.classList.add("contentContainer");
  // -------------------- create the start-up menu --------------------
  const startDisplay = () => {
    let index = false;
    const startContainer = document.createElement("div");
    startContainer.classList.add("startDisplay");
    const markerMenu = document.createElement("div");
    markerMenu.classList.add("markerMenu");

    const heading = document.createElement("h1");
    heading.textContent = "Choose your marker";

    const startBtn = document.createElement("btn");
    startBtn.textContent = "Start Game";
    startBtn.classList = "startBtn";

    contentContainer.appendChild(startContainer);
    startContainer.appendChild(heading);
    startContainer.appendChild(markerMenu);
    startContainer.appendChild(startBtn);

    let btnText = 0;
    for (let i = 0; i < 2; i++) {
      const btn = document.createElement("button");
      btn.classList.add("markerBtn");
      btn.classList.add("btn");

      if (btnText === 0) {
        btn.textContent = "X";
        btnText++;
      } else {
        btn.textContent = "O";
      }

      btn.addEventListener("click", (e) => {
        const mark = e.target.textContent;
        // I dont need this one as I dont implement AI
      });
      markerMenu.appendChild(btn);
    }
    startBtn.addEventListener("click", (e) => {
      index = true;
      startContainer.style.display = "none";
      displayController.displayScoreBoard();
      displayController.renderGame();

      //VAD HÄNDER NÄR VI KLICKAR PÅ START KNAPPEN
    });
  };

  const displayScoreBoard = () => {
    const scoreBoard = document.createElement("div");
    scoreBoard.classList.add("scoreBoard");

    const xPlayer = document.createElement("p");
    xPlayer.id = "xPlayer";
    xPlayer.textContent = "xPlayer: ";
    const xPlayerPoints = document.createElement("p");
    xPlayerPoints.id = "xPlayerPoints";

    const draw = document.createElement("p");
    draw.id = "draw";
    draw.textContent = "draw: ";
    const numberOfDraws = document.createElement("p");
    numberOfDraws.id = "numberOfDraws";

    const oPlayer = document.createElement("p");
    oPlayer.id = "oPlayer";
    oPlayer.textContent = "oPlayer: ";
    const oPlayerPoints = document.createElement("p");
    oPlayerPoints.id = "oPlayerPoints";

    scoreBoard.style.display = "flex";
    contentContainer.appendChild(scoreBoard);
    scoreBoard.appendChild(xPlayer);
    scoreBoard.appendChild(xPlayerPoints);
    scoreBoard.appendChild(draw);
    scoreBoard.appendChild(numberOfDraws);
    scoreBoard.appendChild(oPlayer);
    scoreBoard.appendChild(oPlayerPoints);
  };

  // -------------------- render gameboard 3x3 and add eventlistener to it --------------------
  const renderGame = () => {
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("gameBoard");
    gameContainer.id = "gameBoard";

    gameContainer.style.display = "grid";
    for (let i = 0; i < gameBoard.board.length; i++) {
      const gridItem = document.createElement("div"); // create the boxes
      gridItem.classList.add("gridItem");
      gridItem, (id = "gridItem");
      gridItem.dataset.index = i; // tells which box is clicked
      gridItem.addEventListener("click", (e) => {
        // add eventListener do each box
        const clickedBox = e.target.dataset.index;
        gameLogic.validateMove(clickedBox);
        gridItem.textContent = gameBoard.board[i];
      });
      contentContainer.appendChild(gameContainer);
      gameContainer.appendChild(gridItem);
    }
  };

  const displayEndGame = () => {
    const endScreen = document.createElement("div");
    endScreen.classList.add("endGame");
    endScreen.id = "endGame";

    let btnText = 0;
    for (let i = 0; i < 2; i++) {
      const btn = document.createElement("button");
      btn.classList.add("btn");
      if (btnText === 0) {
        btn.textContent = "ReMatch";
        btn.dataset.index = btn.textContent;
        btnText++;
      } else {
        btn.textContent = "Exit";
        btn.dataset.index = btn.textContent;
      }
      btn.addEventListener("click", (e) => {
        const choice = e.target.dataset.index;
        console.log("user choosed; ", choice);
        if (choice === "ReMatch") {
          gameLogic.reMatch();
        } else {
          gameLogic.exitGame();
        }
      });
      contentContainer.appendChild(endScreen);
      endScreen.appendChild(btn);
      console.log("does work");
    }
  };

  return { startDisplay, displayScoreBoard, displayEndGame, renderGame };
})();

//
//
// ---------------------------------------- create the players ----------------------------------------
const playerFactory = (marker, points) => {
  return {
    marker,
    points,
  };
};

//
//
//
// ---------------------------------------- Handels all logic under the game ----------------------------------------
const gameLogic = (() => {
  displayController.startDisplay();
  // displayController.displayScoreBoard();
  // displayController.renderGame(); // render the game so user can see it
  const playerX = playerFactory("x", 0, true);
  const playerO = playerFactory("o", 0, true);
  let winner = "";
  let gameGoing = true;
  let slotsTaken = 0;
  let whosTurn = "x";

  // -------------------- Validate so the choosen box is empty, if not error msg, try again --------------------
  const validateMove = (clickedBox) => {
    if (gameBoard.board[clickedBox] != "") {
      console.log("not empty");
    } else {
      console.log("empty");
      makeMove(clickedBox);
    }
  };

  const makeMove = (index) => {
    gameBoard.board.splice(index, 1, whosTurn); // add x/o in the array
    console.log("efter varje klick: ", gameBoard.board);
    // checking for a winner before we change who turn it is
    if (whosTurn === "x") {
      whosTurn = "o";
    } else {
      whosTurn = "x";
    }
    slotsTaken += 1;
    checkWinner(slotsTaken);
    console.log("slots taken; ", slotsTaken);
  };

  // -------------------- Looks for winners --------------------
  const checkWinner = () => {
    const winningMoves = [
      //winning combinations
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // -------------------- Looks for a winner or a draw each time someone make a move --------------------
    for (let i = 0; i < winningMoves.length; i++) {
      const combo = winningMoves[i];
      if (
        gameBoard.board[combo[0]] === whosTurn &&
        gameBoard.board[combo[1]] === whosTurn &&
        gameBoard.board[combo[2]] === whosTurn
      ) {
        winner = whosTurn; //declaring the winner
        gameGoing = false; // stopping the game if we have a winner
        updateScores(winner);
        displayController.displayEndGame();
      }
    }
    if (slotsTaken === 9) {
      displayController.displayEndGame();
    }
  };

  // const disableGame = () => {
  //   const grid = document.querySelectorAll("gameBoard >*");

  //   grid.forEach((e) => {
  //     e.removeEventListener("click", handleClick);
  //   });
  // };

  // const activateGame = () => {
  //   const grid = document.querySelectorAll("gameBoard");
  //   grid.forEach((e) => {
  //     e.removesetAttribute("disabled");
  //   });
  // };

  const updateScores = (winner) => {
    if (winner === "x") {
      playerX.points += 1;
      const xplayer = document.getElementById("xPlayerPoints");
      xplayer.textContent = playerX.points;
    } else if (winner === "o") {
      playerO.points += 1;
      const oplayer = document.getElementById("oPlayerPoints");
      oplayer.textContent = playerO.points;
    } else {
    }
  };

  const reMatch = () => {
    // activateGame();
    cleanBoard();
  };

  const exitGame = () => {
    cleanBoard();
  };
  // -------------------- cleans the list and empty the gaming board --------------------
  const cleanBoard = () => {
    gameBoard.board.fill("");
    const boxItems = document.getElementById("gameBoard");
    console.log(boxItems);
    for (const children of boxItems.children) {
      children.textContent = "";
    }
    console.log("efter en match: ", gameBoard.board);
    slotsTaken = 0;

    const matchBtns = document.getElementById("endGame");
    matchBtns.remove();
  };

  return { validateMove, makeMove, reMatch, winner };
})();
