let randomNo = Math.floor(Math.random() * 100 + 1);
const form = document.querySelector("#guess-form");
const submit = document.querySelector("#submit-btn");
const userInput = document.querySelector("#guess-input");
const stats = document.querySelector(".stats-panel");
const previous = document.querySelector("#previous-guesses");
const remaining = document.querySelector("#remaining-count");
const guessStatus = document.querySelector("#guess-status");
const restart = document.querySelector("#restart-btn");
const resultDisplay = document.querySelector("#result-display");
const gameCard = document.querySelector(".game-card"); 

let guesses = 10;
let isPlaying = true;


form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (!isPlaying) return;
  
  const guess = parseInt(userInput.value, 10);
  
 
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert("Please enter a valid number between 1 and 100!");
    userInput.value = "";
    userInput.focus();
    return;
  }
  check(guess);
});

function check(guess) {
  if (guess == randomNo) {
    endGame(true, "🎉 You Won The Game !!!");
    return;
  }

  const span = document.createElement("span");
  span.classList.add("guess-pill");
  span.innerText = guess;
  previous.appendChild(span);
  guesses--;
  remaining.innerText = guesses;


  if (guess < randomNo) {
    guessStatus.innerText = "Low";
    guessStatus.className = "stat-value status-low";
  } else {
    guessStatus.innerText = "High";
    guessStatus.className = "stat-value status-high";
  }
  triggerShake();
  if (guesses <= 0) {
    endGame(false, `💥 You Ran Out of Chances! The number was ${randomNo}.`);
  }
  userInput.value = "";
  userInput.focus();
}

function endGame(won, message) {
  isPlaying = false;
  stats.classList.add("hidden");
  
  resultDisplay.innerText = message;
  resultDisplay.className = won ? "result-display result-win" : "result-display result-loss";
  resultDisplay.classList.remove("hidden");
  
  restart.classList.remove("hidden");
  userInput.disabled = true;
  submit.disabled = true;
}

function triggerShake() {
  gameCard.classList.add("shake-effect");
  setTimeout(() => {
    gameCard.classList.remove("shake-effect");
  }, 400);
}
restart.addEventListener("click", function() {
  guesses = 10;
  remaining.innerText = guesses;
  previous.innerHTML = "";
  guessStatus.innerText = "—";
  guessStatus.className = "stat-value"; 
  
  resultDisplay.innerText = "";
  resultDisplay.className = "result-display hidden";
  
  restart.classList.add("hidden");
  stats.classList.remove("hidden");
  randomNo = Math.floor(Math.random() * 100 + 1);
  
  userInput.disabled = false;
  submit.disabled = false;
  isPlaying = true;
  
  userInput.value = "";
  userInput.focus();
});
