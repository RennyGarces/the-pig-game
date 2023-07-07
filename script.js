"use strict";
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const rollDice = document.querySelector(".roll-dice");
const playerOne = document.querySelector(".playerZero");
const playerTwo = document.querySelector(".playerOne");
const depoPlayer0 = document.querySelector(".depositing--player0");
const depoPlayer1 = document.querySelector(".depositing--player1");
const scorePlayer0 = document.querySelector(".score--0");
const scorePlayer1 = document.querySelector(".score--1");
const container = document.querySelector(".container");
const winner = document.querySelector(".winner");
let deposite = 0;
let player = 0;
let store = [0, 0];
let playerGaming = true;

const cleaning = function () {
  playerGaming = true;
  deposite = 0;
  player = 0;
  store = [0, 0];
  showValues(".score--0", store[0]);
  showValues(".score--1", store[1]);
  showValues(`.depositing--player${player}`, deposite);
  container.classList.remove("hidden");
  playerOne.classList.add("player--playing");
  playerTwo.classList.remove("player--playing");
  document.querySelector(".winner").style.display = "none";
  rollDice.style.display = "none";
};
cleaning();
function showValues(a, b) {
  document.querySelector(a).textContent = b;
}

const changes = function () {
  deposite = 0;
  showValues(`.depositing--player${player}`, deposite);
  playerOne.classList.toggle("player--playing");
  playerTwo.classList.toggle("player--playing");
  player = player === 0 ? 1 : 0;
};

/* button roll */
btnRoll.addEventListener("click", function () {
  if (playerGaming) {
    rollDice.style.display = "block";
    let diceRandom = Math.random() * 9999;
    let ramdonNumber = Math.trunc(Math.random() * 6) + 1;
    rollDice.src = `../img/dice-${ramdonNumber}.png`;
    rollDice.style.transform = `rotate(${diceRandom}deg)`;
    if (ramdonNumber !== 1) {
      deposite += ramdonNumber;
      showValues(`.depositing--player${player}`, deposite);
    } else {
      changes();
    }
  }
});

/*button hold*/
btnHold.addEventListener("click", function () {
  if (playerGaming) {
    store[player] += deposite;
    showValues(`.score--${player}`, store[player]);
    deposite = 0;
    if (store[player] >= 50) {
      playerGaming = false;
      showValues(
        ".winner-message",
        `Congratulation Player ${player + 1},
        win! 🥳 with the score ${store[player]} 🐷`
      );
      container.classList.add("hidden");
      winner.style.display = "block";
    }
    changes();
  }
});
/* =======button new======= */
btnNew.addEventListener("click", cleaning);
