// Versi JavaScript tanpa menggunakan OOP

var timesRun;
var player1Sign = document.getElementsByClassName("player1Sign")
var computerSign = document.getElementsByClassName("computerSign")
var randomIdxPlayer1Before = 0;
var randomIdxComputerBefore = 0;
var winDisplay = document.getElementById("versus");

const ubahWarna = (list, idx) => {
  list[idx].style.backgroundColor = "gray";
}

const resetWarna = (list, idx) => {
  list[idx].style.backgroundColor =  "#AE876B";
}

const winStatus = (player1, computer) => {
  var win = "PLAYER 1\nWIN!";
  var lose = "COM\nWIN!";
  var draw = "DRAW";
  if (player1 == 0 && computer == 2) {
    winDisplay.innerHTML = `<p class="win-status">${win}</p>`;
  } else if (player1 == 2 && computer == 0) {
    winDisplay.innerHTML = `<p class="win-status">${lose}</p>`;
  } else if (player1 > computer) {
    winDisplay.innerHTML = `<p class="win-status">${win}</p>`;
  } else if (player1 < computer) {
    winDisplay.innerHTML = `<p class="win-status">${lose}</p>`;
  } else {
    winDisplay.innerHTML = `<p class="win-status">${draw}</p>`;
  }
}

const getSign = () => {
  winDisplay.innerHTML = `<p class="versus">V S</p>`;
  const randomIdxPlayer1 = Math.floor(Math.random() * 3);
  const randomIdxComputer = Math.floor(Math.random() * 3);
  ubahWarna(player1Sign, randomIdxPlayer1);
  ubahWarna(computerSign, randomIdxComputer);
  if (timesRun > 0) {
    resetWarna(player1Sign, randomIdxPlayer1Before);
    resetWarna(computerSign, randomIdxComputerBefore);
  }
  randomIdxPlayer1Before = randomIdxPlayer1;
  randomIdxComputerBefore = randomIdxComputer;
  timesRun += 1;
  if (timesRun == 25) {
    clearInterval(intervalGenerator);
    ubahWarna(player1Sign, randomIdxPlayer1);
    ubahWarna(computerSign, randomIdxComputer);
    winStatus(randomIdxPlayer1, randomIdxComputer)  
    timesRun = 0;
  }
}

const refreshButton = () => {
  timesRun = 0;
  intervalGenerator = setInterval(getSign, 50);
}
