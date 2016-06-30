var squareRoute = [Do, Gae, Geol, Yut, Mo, Y6, Y7, Y8, Y9, Y10, Y11, Y12, Y13, Y14, Y15, Y16, Y17, Y18, Y19, Home];
var firstDiagRoute = [S0, S1, S2, S7, S8, 15, 16, 17, 18, 19, Home];
var secondDiagRoute = [S5, S6, S2, S3, S4, Home];
var shortestRoute = [S0, S1, S2, S3, S4, Home];

var probs = [18, 38, 30, 9, 5]
var probFuncs = [Do, Gae, Geol, Yut, Mo]

var mal = "X" or "O" or "XX" or "OO"

var rollValue = function(){
  var typed = prompt("which Mal to move?")
  if (routeArray.indexOf(typed)){
    routeArray[.indexOf(typed) + ROLLVALUE] = Mal
  }
};

var squareRouteA = squareRoute[i]

var squareRoutePInnerTexts = [];


Make variables for each Board Space
Store variables into arrays
// id's for each Board Space (pTag)
// store the innerText of the p-Tags as variables
// store the variables in a Route array

Whose turn is it?
// turn-based logic will control which Mal to move
// essentially, this controls the routeArray.indexOf

Roll
// function for rolling sticks (with probabilities)
// var typed = prompt("which Mal do you want to move? (type the board space that your Mal is on)")
// loop through all arrays (important)
var Do = document.querySelector("#Do").innerText.toLowerCase();
var routeArray = [Do, Gae, Geol];


function masterRoll(){
  var typed = prompt("which Mal to move?")
// if the index number's value === true
// clear the routeArray.indexOf(typed)         INDEX NUMBER
// routeArray.indexOf(typed) + ROLLVALUE =
  if (routeArray.indexOf(typed)){
    routeArray[.indexOf(typed) + ROLLVALUE] = Mal
  }
}






// search for presence of Mal in the array
// get the index of it's position
// array.indexOf(typed)
// if it's the same index number of the array as the indexOf board space,
// move the Mal up however many spaces he rolled.
// clear the innerText of the Board Space (pTag) that he is currently in,
// whatever the index position it's in, clear that spot.
// you can store this in a separate function - return value is extremely valuable. the innerText of pTag of Variable of indexNo of looped arrays that is [roll] amount of spaces ahead of the original index position is now equivalent to player's Mal.


Corner-spaces
// function that sees if
// character array.indexOf(corner space) is on a corner spot
// set particular array indices that are special. - Mo, 10, 15, S2
// clear that spot on the array and move Mal to the shortcut route array
// same goes the center piece

Probabilities
// roll with probabilities (bonus: Back-Do)



// the roll number is how many spaces your X moves

// if you roll Yut or Mo, you get to go again
// stacked roll in array.
// decide which roll to use.
// make sure to reset roll.

// if you roll over the other Mal's property, you get to eat it
// you get to choose which Mal to move

Eating Opponents
// function -

Bonus
// bonus: you can stack and move together and not get hurt
    // if the array index at the move has two characters in it, fill up the whole index with characters
    // if the length of the string in that array has more characters, you can't eat.
    // if the length of the string in the array is the same && is greater than 1, you can eat it
//

Which Mal to move?
// ways to have the player select which Mal to move
// 1 eventListener - pTag innerText or column div
document.addEventListener ("click", function() {
  move Mal to # spaces.
})




// START | automatic if none on board
// move the Mal out of the scores box and into the main route array

      // Clear
// SECOND |


Bottom Display
// stick value (binary) display
// roll button
// color of
// Whose turn is it? display
//
// bonus: restart button
