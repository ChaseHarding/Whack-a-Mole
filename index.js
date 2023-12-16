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
hole.classList.add('up'); //adding 'up' to the hole to make the mole pop up
setTimeout(()=> {
    hole.classList.remove('up'); //timeout to make the mole disappear after a random time
    if (!timeUp) molePeek();
}, time);
}

//function for whacking the mole
function bonk(e) {
    if (!e.isTrusted) return;

    //score increase!!
    score++;

    //now hide the mole after getting hit
    this.classList.remove('up');

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
}
