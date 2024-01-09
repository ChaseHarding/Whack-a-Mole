const holes = document.querySelectorAll(".hole");
let gameMusic;
let isMusicPlaying = false;
let score = 0;

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
  if (isMusicPlaying) {
    gameMusic.pause();
    isMusicPlaying = false;
  } else {
    gameMusic.play();
    isMusicPlaying = true;
  }
}
document.getElementById("toggleMusicButton").addEventListener('click', toggleMusic);


//function for game start
function startGame() {
  console.log("Game started!");
  // adding game music
  gameMusic = new Audio("./assets/audio/vodevil-15550.mp3");
  gameMusic.loop = true;
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
  setTimeout(endGame, 10000);
  // calling the endGame function after the timeOut
  // my mind is melting

  //LOL i thought my code wasnt working because the game wasnt restarting
  //in reality i never coded the game to do that
}

document.getElementById("restartButton").addEventListener("click", startGame);

//game start once page is loaded
window.onload = startGame;


