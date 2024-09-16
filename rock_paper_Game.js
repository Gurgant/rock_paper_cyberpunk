class MyRockPaperGame {
  choices = ["Rock", "Paper", "Scissors"];
  score = 0;
  compScore = 0;
  played = 0;
  playing = true;

  constructor({
    rockButton,
    paperButton,
    scissorsButton,
    scoreContainer,
    resultH2,
    userChoiceContainer,
    computerChoiceContainer,
    choiceContainer,
    playerScore,
    computerScore,
    reset,
  }) {
    this.rockButton = rockButton;
    this.paperButton = paperButton;
    this.scissorsButton = scissorsButton;
    this.scoreContainer = scoreContainer;
    this.resultH2 = resultH2;
    this.userChoiceContainer = userChoiceContainer;
    this.computerChoiceContainer = computerChoiceContainer;
    this.choiceContainer = choiceContainer;
    this.playerScore = playerScore;
    this.computerScore = computerScore;
    this.reset = reset;

    // Add event listeners
    this.addEventListeners();

    // Initial state
    this.toggleGame();
  }

  addEventListeners() {
    this.rockButton.onclick = () => this.playGame(0); // rock
    this.paperButton.onclick = () => this.playGame(1); // paper
    this.scissorsButton.onclick = () => this.playGame(2); // scissors
    this.reset.onclick = () => this.resetGame(); // reset
  }

  playGame(userChoice) {
    if (![0, 1, 2].includes(userChoice)) {
      console.error("Invalid choice!");
      return;
    }

    this.userChoice = userChoice;
    this.computerChoice = Math.floor(Math.random() * 3);
    this.played++;

    this.resulted();
    this.displayResult();
    if (!this.playing) this.toggleGame();
  }

  resulted() {
    if (this.userChoice === this.computerChoice) {
      this.updateResultText(this.resultH2, "It's a tie!", "neon-yellow");
    } else if (
      (this.userChoice === 0 && this.computerChoice === 2) ||
      (this.userChoice === 1 && this.computerChoice === 0) ||
      (this.userChoice === 2 && this.computerChoice === 1)
    ) {
      this.score++;
      this.updateResultText(this.resultH2, "You win!", "neon-green");
    } else {
      this.compScore++;
      this.updateResultText(this.resultH2, "You lose!", "neon-red");
    }
  }

  updateResultText(element, text, color) {
    // Remove previously added color classes
    element.classList.remove("neon-red", "neon-green", "neon-yellow");

    // Add new class and update the text
    element.textContent = text;
    element.classList.add(color);
  }

  displayResult() {
    this.updateChoiceText(
      this.userChoiceContainer,
      this.choices[this.userChoice]
    );
    this.updateChoiceText(
      this.computerChoiceContainer,
      this.choices[this.computerChoice]
    );
    this.playerScore.textContent = this.score;
    this.computerScore.textContent = this.compScore;
  }

  updateChoiceText(element, text) {
    element.textContent = text;
  }

  resetGame() {
    if (this.played) {
      this.score = 0;
      this.compScore = 0;
      this.played = 0;
      this.toggleGame();
    }
  }

  toggleGame() {
    this.playing = !this.playing;
    this.choiceContainer.style.display = this.playing ? "block" : "none";
    this.scoreContainer.style.display = this.playing ? "block" : "none";
  }
}

// Instantiate the game
const game2 = new MyRockPaperGame({
  rockButton: document.getElementById("rock"),
  paperButton: document.getElementById("paper"),
  scissorsButton: document.getElementById("scissors"),
  scoreContainer: document.getElementById("score-container"),
  resultH2: document.getElementById("result"),
  userChoiceContainer: document.getElementById("span_player_choice"),
  computerChoiceContainer: document.getElementById("span_computer_choice"),
  choiceContainer: document.getElementById("choice-container"),
  playerScore: document.getElementById("span_player_score"),
  computerScore: document.getElementById("span_computer_score"),
  reset: document.getElementById("reset"),
});

let moon = document.getElementById("moon");
let sun = document.getElementById("sun");
let toggleSwitch = document.getElementById("toggleSwitch");

document.addEventListener("DOMContentLoaded", function () {
  toggleSwitch.checked = true; // Start in night mode by default
  toggleMode(toggleSwitch.checked);

  toggleSwitch.addEventListener("change", function () {
    toggleMode(this.checked);
  });

  function toggleMode(isNightMode) {
    if (isNightMode) {
      moon.style.left = "0";
      moon.style.opacity = "1";
      sun.style.left = "100px";
      sun.style.opacity = "0";
      document.body.classList.add("night-mode");
      document.body.classList.remove("day-mode");
    } else {
      moon.style.left = "-100px";
      moon.style.opacity = "0";
      sun.style.left = "50px";
      sun.style.opacity = "1";
      document.body.classList.add("day-mode");
      document.body.classList.remove("night-mode");
    }
  }
});
