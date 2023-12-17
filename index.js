const holes = document.querySelectorAll('.hole');

let score = 0;

//function for randome hole selection
function randomHole() {
 const index = Math.floor(Math.random() * holes.length)
 return holes[index];
}
//function for making mole appear
function molePeek() {
//this should genereate a random time for the mole to pop up
const time = Math.random() * 1000 + 500; //random timing
const hole = randomHole();
const moleImage = hole.querySelector('img'); //should put the mole image in the hole
moleImage.style.display = 'block'; //mole image should appear now when molepeek function runs
hole.classList.add('up'); //adding 'up' to the hole to make the mole pop up
setTimeout(()=> {
    hole.classList.remove('up'); //timeout to make the mole disappear after a random time
    moleImage.style.display = 'none'; //mole should hide 
    if (!timeUp) molePeek();
}, time);
}

//function for whacking the mole
function bonk(e) {
    if (!e.isTrusted) return;

    //originally without this code we could click the hole repeatedly and get infinite points 
    //this will check if a mole is currently visible with the 'up' class
    if (this.classList.containes('up')) {

    //score increase!!
    score++;

    //score update!!
    document.getElementById('score').textContent = score;

    const moleImage = this.querySelector('img'); //grab the mole image
    moleImage.style.display = none; //when the mole is hit it should disappear

    //now hide the mole after getting hit
    this.classList.remove('up');
    }

}

//event listeners for mouse clicking
//even listener for all holes, calling that bonk function
holes.forEach(hole => hole.addEventListener('click', bonk));

//timer for game to end
let timeUp = false;

//function for game start
function startGame() {
    //reset the score and game status 
    score = 0
    timeUp = false
    //moles start appearing
    molePeek();

    //timeout to end game after certain amount 
    setTimeout(() => (timeUp = true), 10000);
}

//game start once page is loaded
window.onload = startGame;





