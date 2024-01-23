let titleMusic;
let isMusicPlaying = false;

function titleLoad() {
  titleMusic = new Audio("./assets/audio/gaming-music-3-146305.mp3");

  document.addEventListener("click", clickHandler);

  document
    .getElementById("toggleMusicButton")
    .addEventListener("click", toggleMusic);

  console.log("turn up the music");
}

function clickHandler() {
  if (!isMusicPlaying) {
    titleMusic.play();
    // making the music loop
    titleMusic.loop = true;
    isMusicPlaying = true;
  }

  document.removeEventListener("click", clickHandler);
}

function toggleMusic() {
  const musicIcon = document.getElementById("musicIcon");

  if (isMusicPlaying) {
    titleMusic.pause();
    isMusicPlaying = false;

    musicIcon.src = "./assets/images/MusicNoteOff.PNG";
  } else {
    titleMusic.play();
    isMusicPlaying = true;

    // and now they should display my on or off image depending on if music is on or off
    musicIcon.src = "./assets/images/MusicNote.PNG";
  }
}

//i have to set up the initial state of the music note
function setupMusicIconImage() {
  const musicIcon = document.getElementById("musicIcon");
  musicIcon.alt = "Music Note";
}

document
  .getElementById("toggleMusicButton")
  .addEventListener("click", toggleMusic);

document
  .getElementById("howToPlayButton")
  .addEventListener("click", openHowToPlayBox);

function openHowToPlayBox() {
  const openHowToPlayBox = document.getElementById("howToPlayBox");
  openHowToPlayBox.style.display = "block";
}

function closeHowToPlayBox() {
  const howToPlayBox = document.getElementById("howToPlayBox");
  howToPlayBox.style.display = "none";
}

document.getElementById("startButton").addEventListener("click", () => {
  window.location.href = "game.html";
});

window.onload = titleLoad;
