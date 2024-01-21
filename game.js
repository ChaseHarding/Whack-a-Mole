const holes = document.querySelectorAll(".hole");
let gameMusic;
let isMusicPlaying = false;
let score = 0;
const countdownNumberElement = document.getElementById("countdownNumber");
const countdownBackgroundElement = document.getElementById("countdown");

//testing out new branches
//To do: 
// 1. add user select: none in css to prevent user ability to highlight text
// 2. overflow:hidden for an attribute in the holes so we can animate sliding in and keep mole image within holes
// 3. add click event to animate a hammer rotation


//GAME MECHANICS

//function for random hole selection
function randomHole() {
  const index = Math.floor(Math.random() * holes.length); //this generates a number between 0 and the length of holes
  return holes[index]; // this returns a a randomly generated value from the holes array
}
//function for making mole appear
function molePeek() {
  //this should genereate a random time for the mole to pop up
  const time = Math.random() * 1000 + 500; //random timing
  //specifically multiplying it by 1000 gives me a value between 0 and 1000 and adding 500 ensures the number will be at least 500millseconds
  // so between 0.5 and 1.5 seconds
  const hole = randomHole();
  const moleImage = hole.querySelector("img"); //should put the mole image in the hole
  moleImage.style.display = "block"; //mole image should appear now when molepeek function runs
  hole.classList.add("up"); //adding 'up' to the hole to make the mole pop up
  setTimeout(() => {
    hole.classList.remove("up"); //timeout to make the mole disappear after a random time
    moleImage.style.display = "none"; //mole should hide
    if (!timeUp) molePeek();
  }, time);
}

//function for whacking the mole
function bonk(e) {
  //originally placed here, this allowed the user to click the hole and hear the squeak repeatedly 
  // moleSqueak();
  if (!e.isTrusted) return;


  //originally without this code we could click the hole repeatedly and get infinite points
  //this will check if a mole is currently visible with the 'up' class
  if (this.classList.contains("up")) {
    //now im checking for the up class given to our displayed moles
    moleSqueak();
    //so mole clicked confirms that this works
    console.log("Mole clicked!");
    //score increase!!
    score++;

    //score update!!
    document.getElementById("score").textContent = score;

    const moleImage = this.querySelector("img"); //grab the mole image
    moleImage.style.display = "none"; //when the mole is hit it should disappear
    //omg the value should be a string, it was interepting it as a variable duh

    //now hide the mole after getting hit
    this.classList.remove("up");
    console.log("Mole hidden!");
    //console log is telling me that none is not defined
  }
}

//event listeners for mouse clicking
//even listener for all holes, calling that bonk function
holes.forEach((hole) => hole.addEventListener("click", bonk));

 
//timer for game to end
// let timeUp = false;
// this is redudant, globally calling this var is not necessary

// lets simplify the code
function endGame() {
  console.log("Game over!");
  timeUp = true;

  let gameOverTitleElement = document.querySelector(".gameOverTitle");
  let scoreElement = document.querySelector(".score");
  let gameoverContainer = document.querySelector(".gameOverMessage");

  gameOverTitleElement.style.display = "block";
  scoreElement.style.display = "block";
  gameoverContainer.style.display = "block";
}

// its not perfect but its pretty close
const timeBar = document.querySelector(".timer-bar");

//logic for updating the visible color change based on timer
function updateTimeBar(percent) {
  timeBar.style.width = `${percent}%`;
  //adjusting colors based on a timers value
  if (percent > 70) {
    timeBar.style.backgroundColor = 'green';
  } else if (percent > 30) {
    timeBar.style.backgroundColor = 'yellow';
  } else {
    timeBar.style.backgroundColor = 'red';
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
    if(timeLeft <= 0) {
      clearInterval(timer);
      //i thought setting the interval for the timer to 0 again would fix the delay
      // updateTimeBar(0);
      endGame();
      // instead we'll call endGame function once the timer is up
    }

    timeLeft -= interval;
  }, interval);

}


function newGame() {
  let countdownValue = 3;

  //to display my start game message initially
  const startGameMessage = document.getElementById("startGameMessage");
  startGameMessage.style.display = "block";

  //listener for the enter key to be pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      //hide that
      startGameMessage.style.display = "none";
    
  //setting an interval to update the countdown every second
  const countdownInterval = setInterval(() => {
    countdownNumberElement.textContent = countdownValue;

    //and decrease the time now
    countdownValue--;

    if(countdownValue < 0) {
      clearInterval(countdownInterval);
      startGame();
//hide the element after countdown
      countdownNumberElement.style.display = "none";
      countdownBackgroundElement.style.display = "none";
    }
  }, 1000);
}
});
}

//function for game start
function startGame() {
  console.log("Game started!");
  // adding game music
  gameMusic = new Audio("assets/audio/vodevil-15550.mp3");
  gameMusic.loop = true;
  gameMusic.volume = 0.2//setting default to something lower its too loud

const volumeControl = document.createElement("input");
volumeControl.type = "range"
volumeControl.min = 0;
volumeControl.max = 1;
volumeControl.step = 0.1;
volumeControl.value = 1;
//styling 
volumeControl.style.background = "linear-gradient(to right, blue, lightblue)"; //setting background color
volumeControl.style.border = "1px solid blue";
volumeControl.addEventListener('input', () => {
  gameMusic.volume =volumeControl.value;
});

document.body.appendChild(volumeControl);

  gameMusic.play();

  //reset the score and game status
  score = 0;
  timeUp = false;
  let gameoverContainer = document.querySelector(".gameOverMessage");

  gameoverContainer.style.display = "none";

  //update the score display
  document.getElementById("score").textContent = score;
  //moles start appearing
  molePeek();
  console.log("Mole peeking");

  //going to add another 10 seconds
  startTimer(15000);

}

//MUSIC AND AUDIO

 //adding a squeak sound effect 
 function moleSqueak() {
  let squeakSound = new Audio("./assets/audio/mixkit-little-squeak-1018.wav");
  squeakSound.currentTime = 0; //set the current time to only the beginning second 
  squeakSound.play();
  }

function toggleMusic() {
const musicIcon = document.getElementById("musicIcon")

  if (isMusicPlaying) {
    gameMusic.pause();
    isMusicPlaying = false;

    //please just display the music off icon
    musicIcon.src = "./assets/images/MusicNoteOff.PNG";
    
  } else {
    gameMusic.play();
    isMusicPlaying = true;
   
    // and now they should display my on or off image depending on if music is on or off
    musicIcon.src = "./assets/images/MusicNote.PNG";
  }
}

//i have to set up the initial state of the music note
function setupMusicIconImage() {
  const musicIcon = document.getElementById("musicIcon");
  musicIcon.alt = "Music Note"
}

document.getElementById("toggleMusicButton").addEventListener('click', toggleMusic);

//NAVIGATION

function handleGoToTitleClick() {
  goToLoading("index.html");
}

function handleRestartClick() {
  goToLoading("game.html");
}

document.getElementById("goToTitleButton").addEventListener('click', handleGoToTitleClick);

document.getElementById("restartButton").addEventListener("click", handleRestartClick);


function goToLoading(destination) {
  window.location.href = `loading.html?destination=${destination}`;
}

//game start once page is loaded
window.onload = () => {
  setupMusicIconImage();
  newGame();
}