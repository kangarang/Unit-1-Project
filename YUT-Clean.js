document.addEventListener("DOMContentLoaded", Game)
console.log("type Game.chooseMalAndRoute(); to begin playing");

function Game(){
  var button = document.querySelector("#rollButt");
  var moveButt = document.querySelector("#MOVE");
  var resetButt = document.querySelector("#resetButt");
  var firstBinary = document.querySelector("#firstBinary");
  var secBinary = document.querySelector("#secBinary");
  var all = {};
  var mal= "X";
  var dMal= "XX";
  var notDMal= "OO";
  var notMal= "O";
  var rollValue = 0;
  var rollTotal = 0;
  var turn = 0;
  var idPre= "";
  var idPost= "";
  var wins = 0;
  all.longRoute = [MALX, DO, GAE, GEOL, YUT, MO, Y6, Y7, Y8, Y9, Y10, Y11, Y12, Y13, Y14, Y15, Y16, Y17, Y18, Y19, HOME, ENDX]
  all.middleRoute1 = [MO, YS0, YS1, YS2, YS7, YS8, Y15, Y16, Y17, Y18, Y19, HOME, ENDX]
  all.middleRoute2 = [Y10, YS5, YS6, YS2, YS3, YS4, HOME, ENDX]

  chooseMalAndRoute();

  function resetGame(){
    turn = 0;
    rollTotal = 0;
    rollValue = 0;
    for (var route in all) {
      if (all.hasOwnProperty(route)) {
        for (var i=0; i<all[route].length; i++){
          all[route][i].innerText = "";
        }
      }
    }
    TITLE.innerText = "Yut Nori!";
    ENDX.innerText = "";
    ENDO.innerText = "";
    MALX.innerText = "X";
    MALO.innerText = "O";
    firstBinary.innerText = "";
    secBinary.innerText = "";
    chooseMalAndRoute();
  };

  function chooseMalAndRoute() {
    resetButt.addEventListener("click", resetGame);
    turn ++;
    if (turn % 2 === 0) {
      mal = "X";
      dMal = "XX"
      notMal = "O"
      notDMal = "OO"
      all.longRoute[0] = MALX;
      all.longRoute[all.longRoute.length - 1] = ENDX;
      all.middleRoute1[all.middleRoute1.length - 1] = ENDX;
      all.middleRoute2[all.middleRoute2.length - 1] = ENDX;
    } else {
      mal = "O"
      dMal = "OO"
      notMal = "X"
      notDMal = "XX"
      all.longRoute[0] = MALO;
      all.longRoute[all.longRoute.length - 1] = ENDO;
      all.middleRoute1[all.middleRoute1.length - 1] = ENDO;
      all.middleRoute2[all.middleRoute2.length - 1] = ENDO;
    }
    firstNum.innerText = "Mal: " + mal;
    secNum.innerText = "";

    button.addEventListener("click", roll);
  };


  function roll() {
    button.removeEventListener("click", roll);
    var rollOne = Math.round(Math.random());
    var rollTwo = Math.round(Math.random());
    var rollThree = Math.round(Math.random());
    var rollFour = Math.round(Math.random());
    var rollKorean;
    firstBinary.innerText = rollOne + "" + rollTwo;
    secBinary.innerText = rollThree + "" + rollFour;

    rollValue = rollOne + rollTwo + rollThree + rollFour;

    if (rollValue === 1) {
      rollTotal = 1;
      rollKorean = "Do"
      console.log("You rolled Do!");
    } else if (rollValue === 2) {
      rollTotal = 2;
      rollKorean = "Gae"
      console.log("You rolled Gae!");
    } else if (rollValue === 3) {
      rollTotal = 3;
      rollKorean = "Geol!"
      console.log("You rolled Geol!");
    } else if (rollValue === 4) {
      rollTotal = 4;
      rollKorean = "Yut!!"
      console.log("You rolled Yut!");
    } else if (rollValue === 0) {
      rollTotal = 5;
      rollKorean = "Mo!!!"
      console.log("You rolled Mo!");
      // roll()
    };

    secNum.innerText = rollKorean;
    eventHandle();
  };

  function eventHandle(){
    for (var route in all) {
      if (all.hasOwnProperty(route)) {
        for (var i = 0; i < all[route].length; i ++) {
          if (all[route][i].innerText === mal) {
            idPre = all[route][i];
            // var malPre = document.getElementById(idPre);

          }

        } // might have to make EventListeners for each individual div
      }
    }
    moveButt.addEventListener("click", movMal);
  }

  function movMal() {
    moveButt.removeEventListener("click", movMal);
    if (idPre === YS2 || idPre === Y10 || idPre === YS5 || idPre === YS6 || idPre === YS3 || idPre === YS4) {
      all.actualRoute = all.middleRoute2;
    } else if (idPre === MO || idPre === YS0 || idPre === YS1 || idPre === YS7 || idPre === YS8) {
      all.actualRoute = all.middleRoute1;
    } else {
      all.actualRoute = all.longRoute;
    }

    // take the initial location (idPre), add the rollTotal, get the final location.
    var indexAfterShift = all.actualRoute.indexOf(idPre) + rollTotal;  // this number is the index number of where the dice have positioned us
    // the reason why we need this number is in case the dice take us beyond the final index.

    if (indexAfterShift > all.actualRoute.length-1) {
      return gameOver();
    } else {
      idPost = all.actualRoute[indexAfterShift];
      if (idPost.innerText === notMal) {
        if (mal === "X") {
          MALO.innerText = "O";
        } else {
          MALX.innerText = "X";
        }
      }
      idPost.innerText = idPre.innerText;
      idPre.innerText = "";
      // idPre.innerText.split(mal);
      chooseMalAndRoute();
    }
  };

  function gameOver() {
    idPre.innerText = "";
    console.log(mal + " WINS!");
    all.actualRoute[all.actualRoute.length - 1].innerText = mal;
    alert (mal + " WON!");
    wins ++;
  };

}; // END
