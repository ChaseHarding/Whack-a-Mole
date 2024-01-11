let titleMusic;
let isMusicPlaying = false;

// interesting, so theres a browser policy that doesnt allow music to autoplay
// to ensure user experience stays up
// the solution is to run music only once the player intereacts with the page
// its not idea to me, but ill add an event listener for a click thatll then start the music
function titleLoad() {
  titleMusic = new Audio("./assets/audio/gaming-music-3-146305.mp3");

  document.addEventListener('click', clickHandler);

  document.getElementById("toggleMusicButton").addEventListener('click', toggleMusic);

  console.log("turn up the music");

  }

function clickHandler() {
    if (!isMusicPlaying) {
        titleMusic.play();
        // making the music loop
        titleMusic.loop = true;
        isMusicPlaying = true;
      }

      document.removeEventListener('click', clickHandler);
}

function toggleMusic() {
    if (isMusicPlaying) {
        titleMusic.pause();
        isMusicPlaying = false;

     
    } else {
        titleMusic.play();
        isMusicPlaying = true;
        
    }
}


document.getElementById("startButton").addEventListener("click", () => {
  window.location.href = "index.html";
});


window.onload = titleLoad;
