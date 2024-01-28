let currMoleTile;
let currBombTile;
let gameMusic;
let isMusicPlaying = false;
let score = 0;
const countdownNumberElement = document.getElementById("countdownNumber");
const countdownBackgroundElement = document.getElementById("countdown");
const cursor = document.querySelector(".cursor");
let scoreElement = document.querySelector(".score");
let timerBarElement = document.querySelector(".timer-bar");


//GAME MECHANICS

function setGame() {
  //setting up a grid
  for (let i = 0; i < 9; i++) { //i starts at 0, continues to 8, stops at 9.
    // so we'll have 9 holes insides individual divs with appropriate ids
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener('click', bonk);
    document.getElementById("board").appendChild(tile);
  }

  setInterval(setMole, 1000); //every 1 second we set a mole
  setInterval(setBomb, 2500) //every 2.5 seconds we set a bomb
}

function getRandomTile() {
  // Math.random --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
  let num = Math.floor(Math.random() * 9);
  // set number to string so we can set to id
  return num.toString();
}

function setMole() {

  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }

  let mole = document.createElement('img');
  mole.src = 'assets/mole-transparent-bg-asset.png';
  mole.alt = 'Mole';
  console.log('Mole spawned')

  let num = getRandomTile();
  if(currBombTile && currBombTile.id == num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setBomb() {

  if (currBombTile) {
    currBombTile.innerHTML = "";
  }

  let bomb = document.createElement('img');
  bomb.src = 'assets/images/bomb.PNG';
  bomb.alt = "Bomb";
  console.log('Bomb spawned')

  let num = getRandomTile();
  if(currMoleTile && currMoleTile.id == num) {
    return;
  }
  currBombTile = document.getElementById(num);
  currBombTile.appendChild(bomb);

}

function bonk() {

  if (this == currMoleTile) {
    score += 10;
    bonkSound = new Audio("assets/audio/mixkit-little-squeak-1018.wav");
    currMoleTile.innerHTML = ""; //hide image
   
  } else if (this == currBombTile) {
    score -= 20;
    bonkSound = new Audio("assets/audio/small-explosion-129477.mp3");
    // bonkSound = new Audio("assets/audio/small-dog-barking-84707.mp3");
    currBombTile.innerHTML = "";
  
  }

  //playing the bonk sound
  if (bonkSound) {
    bonkSound.currentTime = 0;
    bonkSound.play();

    //update score display
    document.getElementById('score').innerHTML = score.toString();
  }
}

// function for End Game
function endGame() {
  console.log("Game over!");
  timeUp = true;

  let gameOverTitleElement = document.querySelector(".gameOverTitle");
  let gameoverContainer = document.querySelector(".gameOverMessage");

  gameOverTitleElement.style.display = "block";
  gameoverContainer.style.display = "block";
}

// its not perfect but its pretty close
const timeBar = document.querySelector(".timer-bar");

//logic for updating the visible color change based on timer
function updateTimeBar(percent) {
  timeBar.style.width = `${percent}%`;
  //adjusting colors based on a timers value
  if (percent > 70) {
    timeBar.style.backgroundColor = "green";
  } else if (percent > 30) {
    timeBar.style.backgroundColor = "yellow";
  } else {
    timeBar.style.backgroundColor = "red";
  }
}

// logic to start the timer
function startTimer(duration) {
  let timeLeft = duration;
  const interval = 100;

  const timer = setInterval(function () {
    const percent = (timeLeft / duration) * 100;
    updateTimeBar(percent);

    //if the timeLeft reaches OR goes below 0, timer is cleared, and the endGame function is called
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }

    timeLeft -= interval;
  }, interval);
}

function newGame() {
  let countdownValue = 3;

  //to display my start game message initially
  const startGameMessage = document.getElementById("startGameMessage");
  const countDownDisplay = document.querySelector(".countdown");
  startGameMessage.style.display = "block";

  //listener for the enter key to be pressed
  const handleStart = () => {
    //hide that
    countDownDisplay.style.display = "flex";
    startGameMessage.style.display = "none";

    //setting an interval to update the countdown every second
    const countdownInterval = setInterval(() => {
      countdownNumberElement.textContent = countdownValue;

      //and decrease the time now
      countdownValue--;

      if (countdownValue < 0) {
        clearInterval(countdownInterval);
        setGame();
        startGame();
        //hide the element after countdown
        countdownNumberElement.style.display = "none";
        countdownBackgroundElement.style.display = "none";
      }
    }, 1000);
  };
  //listener for enter key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleStart();
    }
  });
}

//function for game start
function startGame() {
  console.log("Game started!");
  // adding game music
  scoreElement.style.display = "flex";
  timerBarElement.style.display = "block";
  gameMusic = new Audio("assets/audio/vodevil-15550.mp3");
  gameMusic.loop = true;
  gameMusic.volume = 0.2; //setting default to something lower its too loud
  gameMusic.play();
  //reset the score and game status
  score = 0;
  timeUp = false;
  let gameoverContainer = document.querySelector(".gameOverMessage");

  gameoverContainer.style.display = "none";
  startTimer(15000);
}
//mouse movement
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});
window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});
window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});

//MUSIC AND AUDIO

//adding a squeak sound effect
function moleSqueak() {
  let squeakSound = new Audio("./assets/audio/mixkit-little-squeak-1018.wav");
  squeakSound.currentTime = 0; //set the current time to only the beginning second
  squeakSound.play();
}

//NAVIGATION

function handleGoToTitleClick() {
  goToLoading("index.html");
}

function handleRestartClick() {
  goToLoading("game.html");
}

document
  .getElementById("goToTitleButton")
  .addEventListener("click", handleGoToTitleClick);

document
  .getElementById("restartButton")
  .addEventListener("click", handleRestartClick);

function goToLoading(destination) {
  window.location.href = `loading.html?destination=${destination}`;
}

//game start once page is loaded
window.onload = () => {
  newGame();
};
