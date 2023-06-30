const computer = {
  marker: "",
  points: 0,
  wins: 0,
  loses: 0,
};

const player = {
  marker: "",
  points: 0,
  wins: 0,
  loses: 0,
};

const gameBoard = () => {
  const board = new Array(9);

  generateBoard = (displayStart) => {
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("gameContainer");
    gameContainer.style.display = "flex";
    displayStart.style.display = "none";
    document.body.appendChild(gameContainer);
    //creating scoreboard that point info will be
    const scoreBoard = document.createElement("div");
    scoreBoard.classList.add("scoreBoard");
    gameContainer.appendChild(scoreBoard);

    //creating scoreboard for marker X
    const scoreXplayer = document.createElement("div");
    scoreXplayer.classList.add("playerScore", "xPlayer");
    scoreBoard.appendChild(scoreXplayer);
    const imgXPlayer = document.createElement("img");
    imgXPlayer.src = "x.svg";
    scoreXplayer.appendChild(imgXPlayer);
    const pXPlayer = document.createElement("p");
    pXPlayer.textContent = "---";
    scoreXplayer.appendChild(pXPlayer);

    //creating scoreboard for matches that are a draw
    const scoreDraw = document.createElement("div");
    scoreDraw.classList.add("playerScore", "draw");
    scoreBoard.appendChild(scoreDraw);
    const imgDraw = document.createElement("img");
    imgDraw.src = "equal.svg";
    const pDrawPlayer = document.createElement("p");
    pDrawPlayer.textContent = "---";
    scoreDraw.appendChild(imgDraw);
    scoreDraw.appendChild(pDrawPlayer);

    //creating scoreboard for player O
    const scoreOplayer = document.createElement("div");
    scoreOplayer.classList.add("playerScore", "oPlayer");
    scoreBoard.appendChild(scoreOplayer);
    const imgOPlayer = document.createElement("img");
    imgOPlayer.src = "circle.svg";

    const pOPlayer = document.createElement("p");
    pOPlayer.textContent = "---";
    scoreOplayer.appendChild(imgOPlayer);
    scoreOplayer.appendChild(pOPlayer);
    console.log(player.marker);

    //Highlight the marker player choose in yellow,
    if (player.marker === "X") {
      imgXPlayer.src = "xYellow.svg";
      imgOPlayer.src = "cLightDark.svg";
    } else {
      imgXPlayer.src = "xLightDark.svg";
      imgOPlayer.src = "circleYellow.svg";
    }

    //create container for the grids
    const playField = document.createElement("div");
    gameContainer.appendChild(playField);
    playField.classList.add("playField");

    //create grids to play on
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("gridItem");
      playField.appendChild(cell);
    }
    gameLogic.playerMove(playField);
  };

  return { generateBoard };
};

const gameLogic = (() => {
  playerMove = (playField) => {
    const gridElements = playField.querySelectorAll(".gridItem");
    gridElements.forEach((gridItem) => {
      gridItem.addEventListener("click", () => {
        // addera player marker
        gridItem.textContent = player.marker;
      });
    });
    console.log(gridElements);
  };

  return { playerMove };
})();

// ------------------- SHOW START MENU -------------------
const startGame = (() => {
  const displayStart = document.createElement("div");
  displayStart.classList.add("displayStart");
  const chooseMarker = document.createElement("h1");
  chooseMarker.textContent = "Choose Marker";
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btncontainer");
  const btnO = document.createElement("button");
  btnO.id = "btnO";
  btnO.textContent = "O";
  const btnX = document.createElement("button");
  btnX.id = "btnX";
  btnX.textContent = "X";
  const inputPlayerName = document.createElement("input");
  inputPlayerName.type = "text";
  inputPlayerName.value = "Your name";
  const startGame = document.createElement("button");
  startGame.id = "startGame-el";
  startGame.textContent = "START GAME";

  document.body.appendChild(displayStart);
  displayStart.appendChild(chooseMarker);
  displayStart.appendChild(btnContainer);
  btnContainer.appendChild(btnO);
  btnContainer.appendChild(btnX);
  displayStart.appendChild(inputPlayerName);
  displayStart.appendChild(startGame);

  // ------------------- LISTEN ON PLAYER CHOICE -------------------
  const getPlayerChoice = (() => {
    let playerChoice = "";
    const markedChoice = btnContainer.querySelectorAll("button");
    markedChoice.forEach((button) => {
      button.addEventListener("click", (e) => {
        playerChoice = e.target.id;
        console.log(playerChoice);
        if (playerChoice === "btnX") {
          player.marker = "X";
          computer.marker = "O";
          btnX.style.backgroundColor = "#debe1d";
          btnO.style.backgroundColor = "#30314a";
        } else {
          player.marker = "O";
          computer.marker = "X";
          btnX.style.backgroundColor = "#30314a";
          btnO.style.backgroundColor = "#debe1d";
        }
      });
    });
  })();

  const startGameBtn = () => {
    gameBoard().generateBoard(displayStart);
  };

  startGame.addEventListener("click", startGameBtn);
})();

const resetGame = () => {};

const Player = (name, level) => {
  let health = level * 2;
  const getLevel = () => level;
  const getName = () => name;
  const die = () => {
    // uh oh
  };

  const damage = (x) => {
    health -= x;
    if (health <= 0) {
      die();
    }
  };

  const attack = (enemy) => {
    if (level < enemy.getLevel()) {
      damage(1);
      console.log(`${enemy.getName()} has damaged ${name}`);
    }
    if (level >= enemy.getLevel()) {
      enemy.damage(1);
      console.log(`${name} has damaged ${enemy.getName()}`);
    }
  };

  return { attack, damage, getLevel, getName };
};

const jimmie = Player("jim", 10);
const badGuy = Player("jeff", 5);
jimmie.attack(badGuy);
