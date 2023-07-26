let target;
let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

let humanGuessInput = document.getElementById('human-guess');
let roundNumberDisplay = document.getElementById('round-number');
let computerGuessDisplay = document.getElementById('computer-guess');
let humanScoreDisplay = document.getElementById('human-score');
let computerScoreDisplay = document.getElementById('computer-score');
let targetNumberDisplay = document.getElementById('target-number');
let computerWinsDisplay = document.getElementById('computer-wins');
let guessButton = document.getElementById('guess');
let nextRoundButton = document.getElementById('next-round')

let compareGuesses = (humanGuess, computerGuess, targetGuess) => {
  const humanDifference = Math.abs(targetGuess - humanGuess);
  const computerDifference = Math.abs(targetGuess - computerGuess);
  return humanDifference <= computerDifference;
};

let updateScore = (winner) => {
    if (winner === "human") {
    humanScore++;
  } else {
    computerScore++;
  }
};

guessButton.addEventListener('click', () => {
  // Generate the target value
  target = Math.floor(Math.random() * 10);

  // Retrieve a human guess and make a computer guess
  let currentHumanGuess = humanGuessInput.value;
  let computerGuess = Math.floor(Math.random() * 10);
  if (currentHumanGuess > 9 || currentHumanGuess < 0) {
    let modal = document.getElementById("alert");
    let close = document.getElementById("close");
    modal.showModal();
    close.addEventListener('click', () => {
      modal.close();
    })
  }

  // Display the computer guess and the target
  computerGuessDisplay.innerText = computerGuess;
  targetNumberDisplay.innerText = target;
  
  // Determine if the human or computer wins:
  let humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target)
  let winner = humanIsWinner ? 'human' : 'computer'

  // Update the correct score:
  updateScore(winner);

  // Display the winner
  if (humanIsWinner) {
    guessButton.innerText = 'You Win!!!!!';
    guessButton.classList.toggle('winning-text')
  } else {
    computerWinsDisplay.innerText = 'Computer Wins!!!';
  }

  // Display the current scores:
  humanScoreDisplay.innerText = humanScore;
  computerScoreDisplay.innerText = computerScore;
  
  // Set the correct disabled state for the buttons
  guessButton.setAttribute('disabled', true)
  nextRoundButton.removeAttribute('disabled');
});

nextRoundButton.addEventListener('click', () => {
  // Increase the round number
  currentRoundNumber++;
  // Display the new round number
  roundNumberDisplay.innerText = currentRoundNumber;

  // Set the correct disabled state for the buttons
  nextRoundButton.setAttribute('disabled', true);
  guessButton.removeAttribute('disabled');

  // Reset the guess input box and the target number display:
  targetNumberDisplay.innerText = '?';
  guessButton.innerText = 'Make a Guess';
  humanGuessInput.value = '';
  computerGuessDisplay.innerText = '?';
  computerWinsDisplay.innerText = '';
  guessButton.classList.remove('winning-text');
});

let addButton = document.getElementById('add');
let subtractButton = document.getElementById('subtract');

addButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value + 1;
  handleValueChange(humanGuessInput.value);
});

subtractButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value - 1;
  handleValueChange(humanGuessInput.value);
});

let handleValueChange = value => {
  if (value > 0 && value <= 9) {
    subtractButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else if (value > 9) {
    addButton.setAttribute('disabled', true);
  } else if (value <= 0) {
    subtractButton.setAttribute('disabled', true);
  }
}

humanGuessInput.addEventListener('input', function(e) {
  handleValueChange(e.target.value);
});
