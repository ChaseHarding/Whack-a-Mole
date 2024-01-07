let myMusic;

// interesting, so theres a browser policy that doesnt allow music to autoplay
// to ensure user experience stays up
// the solution is to run music only once the player intereacts with the page
// its not idea to me, but ill add an event listener for a click thatll then start the music
function titleLoad() {
    myMusic = new Audio("./assets/audio/gaming-music-3-146305.mp3");

    document.addEventListener('click', () => {
        myMusic.play();
        // making the music loop
        myMusic.loop = true;
        // to remove the function afterits been used, to fix the music restarting
        document.removeEventListener('click', arguments.caleee);
    });
   
    console.log("Turn up the music");
}


document.getElementById("startButton").addEventListener('click', () => {
    window.location.href = "index.html";
});

window.onload = titleLoad;