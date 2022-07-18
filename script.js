"use strict";

//selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//starting conditions
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  //switch player and set current score to 0.
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
playing &&
  btnRoll.addEventListener("click", () => {
    if (playing) {
      //Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;

      //Display dice
      diceEl.classList.remove("hidden");
      diceEl.src = `dice-${dice}.png`;

      //check for rolled 1: if true, switch players
      if (dice !== 1) {
        //Add dice value to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        switchPlayer();
      }
    }
  });

btnHold.addEventListener("click", () => {
  if (playing) {
    //Add current to active player's score
    //scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player's score is greater then 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
