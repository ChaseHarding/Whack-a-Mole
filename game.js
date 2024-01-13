const holes = document.querySelectorAll(".hole");
let gameMusic;
let isMusicPlaying = false;
let score = 0;

//Need to make a 3rd html page for a loading screen
//this will improve the ux/ui
// loading page can perform necessary setup and loading before redirecting the player to the game

// going to add to the goToTitle function to take the player to our new loading html
// changing the event listener for our restartbutton 
// write a function that runs the action of going to the loading page

// new idea of adding a new function that 




//function for random hole selection
function randomHole() {
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
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
  moleSqueak();
  if (!e.isTrusted) return;


  //originally without this code we could click the hole repeatedly and get infinite points
  //this will check if a mole is currently visible with the 'up' class
  if (this.classList.contains("up")) {
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

  //adding a squeak sound effect 
  function moleSqueak() {
  let squeakSound = new Audio("assets/audio/mixkit-little-squeak-1018.wav");
  squeakSound.currentTime = 0; //set the current time to only the beginning second 
  squeakSound.play();
  }

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


// function goToTitle() {
//   window.location.href = "index.html";
// } 
// another great learning experience. i was looking for the timeUp to be false
// but also wanted to have these event work when timeUp is true. took me a minute to realize
// less is more and to achieve my outcome i need to just take out the if statement.
// function handleGoToTitleClick() {
//   if (!timeUp) {
//     goToLoading("index.html");
//   }
// }

// function handleRestartClick() {
//   if (!timeUp) {
//     goToLoading("game.html");
//   }
// }

function handleGoToTitleClick() {
    goToLoading("index.html");
}

function handleRestartClick() {
    goToLoading("game.html");
}

document.getElementById("goToTitleButton").addEventListener('click', handleGoToTitleClick);

//timer logic.
//ideally want this to run inside my startGame function, but before i do that i want to make a working product first
// if all goes well, i can refactor into my startGame function
// need a bar that starts at green and progressivly changes colors and looks as if depleting

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

  //timeout to end game after certain amount
  // setTimeout(endGame, 10000);
  // calling the endGame function after the timeOut
  // my mind is melting

  //going to add another 10 seconds
  startTimer(15000);

  //LOL i thought my code wasnt working because the game wasnt restarting
  //in reality i never coded the game to do that
}

document.getElementById("restartButton").addEventListener("click", handleRestartClick);


function goToLoading(destination) {
  window.location.href = `loading.html?destination=${destination}`;
}

//game start once page is loaded
window.onload = () => {
  setupMusicIconImage();
  startGame();
}
