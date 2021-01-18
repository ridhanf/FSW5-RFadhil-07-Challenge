// -------------------------------------------- //
// -------------------------------------------- //
// Rock Paper Scissors Game
// code by Ridhan Fadhilah
// Yogyakarta, 13 Desember 2020

// ------------ Class Creation ---------------- //
// Parent Class Player
class Player {
  constructor(props) {
    // Abstraction
    if (this.constructor === Player) {
      throw new Error("Cannot instantiate from Abstract Class");
    }
    let { name, signs, signIdx } = props;
    this.name = name;
    this.signs = signs;     // DOM Sign pada Game
    this.signIdx = signIdx; // Index Sign: 0 = batu, 1 = kertas, 2 = gunting
  }

  pickSign() {
    let timesRun = 0;
    let signIdxBefore = 0;
    let intervalGenerator = setInterval(() => {
      this.signIdx = Math.floor(Math.random() * 3);   // Men-generate angka random untuk index sebagai sign
      this.signs[this.signIdx].style.backgroundColor = "gray";  // Player memilih sign ditandai dengan perubahan warna latar sign.
      if (timesRun > 0) {
        this.signs[signIdxBefore].style.backgroundColor =  "#AE876B"; // Player tidak jadi memilih sign sebelumnya ditandai warna latar kembali seperti semula.
      }
      signIdxBefore = this.signIdx;
      timesRun += 1;
      if (timesRun == 25) {
        clearInterval(intervalGenerator);
        this.signs[this.signIdx].style.backgroundColor = "gray";  // Sign yg pada akhirnya dipilih oleh Player.
        timesRun = 0;
      }
    }, 50);
  }
}

// Module/Helper using mix-ins
const HumanPlayer = Base => class extends Base {
  refreshGame() {
    super.pickSign();
  }
}

// Child Class
class NormalPlayer extends HumanPlayer(Player) {
  constructor(props) {
    super(props);
  }

  refresh() {
    super.refreshGame();
  }
}

class Computer extends Player {
  constructor(props) {
    super(props);
  }

  pickSign() {
    super.pickSign();
  }
}

// -------------------------------------------- //
// -------------------------------------------- //

// Class Game
class Game {
  constructor(props) {
    let {winDisplay,  player1, player2} = props;
    this.winDisplay = winDisplay;
    this.player1 = player1;
    this.player2 = player2;
  }

  startGame() {
    this.winDisplay.innerHTML = `<p class="versus">V S</p>`;
    this.player1.refresh();
    this.player2.pickSign();
    setTimeout(() => {
      this.whoWin(this.player1.signIdx, this.player2.signIdx);
    }, 1250)
  }

  whoWin(player1, player2) {
  const win = "PLAYER 1\nWIN!";
  const lose = "COM\nWIN!";
  const draw = "DRAW";
  if (player1 == 0 && player2 == 2) {
    this.winDisplay.innerHTML = `<p class="win-status">${win}</p>`;
  } else if (player1 == 2 && player2 == 0) {
    this.winDisplay.innerHTML = `<p class="win-status">${lose}</p>`;
  } else if (player1 > player2) {
    this.winDisplay.innerHTML = `<p class="win-status">${win}</p>`;
  } else if (player1 < player2) {
    this.winDisplay.innerHTML = `<p class="win-status">${lose}</p>`;
  } else {
    this.winDisplay.innerHTML = `<p class="win-status">${draw}</p>`;
  }
  }
}

// -------------------------------------------- //
// -------------------------------------------- //

// Instantiate Player
const player1 = new NormalPlayer({
  name: "Player 1",
  signs: document.getElementsByClassName("player1Sign"),
})

const computer = new Computer({
  name: "Computer",
  signs: document.getElementsByClassName("computerSign"),
})

// Instantiate Game
const game1 = new Game({
  winDisplay: document.getElementById("versus"),
  player1: player1,
  player2: computer
})


// MAIN PROGRAM
const refreshButton = () => {
  game1.startGame();
}
