// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI ELEMENTS
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI Min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listner
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for Guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    exit;
  }

  // check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is Correct, You Win!`);
  } else {
    // Wrong Number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game Over, you lost, the correct number was ${winningNum} `
      );
    } else {
      // Game Continues Awnser wrong
      guessInput.style.borderColor = "red";
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
      guessInput.value = "";
    }
  }
});

// Game over function
function gameOver(won, msg) {
  let color;

  won === true ? (color = "green") : (color = "red");

  // Game Over Lost
  guessInput.disabled = true;

  // Set Border Color to green
  guessInput.style.borderColor = color;

  // Set message
  setMessage(msg, color);

  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

function setMessage(msg, color) {
  message.style.color = color;

  message.textContent = msg;
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
