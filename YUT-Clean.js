document.addEventListener("DOMContentLoaded", Game)

function Game(){
  var button = document.querySelector("#rollButt");
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
  var idPre;
  var idPost;
  var oWins = 0;
  var xWins = 0;
  var indexAfterShift;
  all.longRoute = [MALX, DO, GAE, GEOL, YUT, MO, Y6, Y7, Y8, Y9, Y10, Y11, Y12, Y13, Y14, Y15, Y16, Y17, Y18, Y19, HOME];
  all.middleRoute1 = [MO, YS0, YS1, YS2, YS7, YS8, Y15, Y16, Y17, Y18, Y19, HOME];
  all.middleRoute2 = [Y10, YS5, YS6, YS2, YS3, YS4, HOME];

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
    END.innerText = "";
    MALX.innerText = "XX";
    MALO.innerText = "OO";
    firstBinary.innerText = "";
    secBinary.innerText = "";
    chooseMalAndRoute();
  };

  function chooseMalAndRoute() {
    resetButt.addEventListener("click", resetGame);
    rollTotal = 0;
    idPre = [];
    turn ++;
    if (turn % 2 === 0) {
      mal = "X"
      dMal = "XX"
      notMal = "O"
      notDMal = "OO"
      all.longRoute[0] = MALX;
    } else {
      mal = "O"
      dMal = "OO"
      notMal = "X"
      notDMal = "XX"
      all.longRoute[0] = MALO;
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
    if (rollOne === 1 && rollTwo === 0 && rollThree === 0 && rollFour === 0) {
      rollValue === -1;
      rollTotal --;
      rollKorean = "BACK-DO!"
    } else if (rollValue === 1) {
      rollTotal += 1;
      rollKorean = "Do"
    } else if (rollValue === 2) {
      rollTotal += 2;
      rollKorean = "Gae"
    } else if (rollValue === 3) {
      rollTotal += 3;
      rollKorean = "Geol!"
    } else if (rollValue === 4) {
      rollTotal += 4;
      rollKorean = "Yut!!"
      button.addEventListener("click", roll);
    } else if (rollValue === 0) {
      rollTotal += 5;
      rollKorean = "Mo!!!"
      button.addEventListener("click", roll);
    };

    secNum.innerText = rollKorean;

    findMal();
  };

  function findMal() {
    for (var route in all) {
      if (all.hasOwnProperty(route)) {
        for (var i = 0; i < all[route].length; i ++) {
          if (all[route][i].innerText === mal || all[route][i].innerText === dMal) {
            idPre.push(all[route][i]);
            // var malPre = document.getElementById(idPre);
          }
        } // might have to make EventListeners for each individual div
      }
    };

    idPre[0].addEventListener("click", idMalOne);
    if (idPre[1]){
      idPre[1].addEventListener("click", idMalTwo);
    };

  };


  function idMalOne() {
    idPre[0].removeEventListener("click", idMalOne);
    if (idPre[1]) {
      idPre[1].removeEventListener("click", idMalTwo);
    }
    idPre = idPre[0];
    movMal();
  };

  function idMalTwo() {
    idPre[0].removeEventListener("click", idMalOne);
    idPre[1].removeEventListener("click", idMalTwo);
    idPre = idPre[1];
    movMal();
  };


  function movMal() {
    if (idPre === YS2 || idPre === Y10 || idPre === YS5 || idPre === YS6 || idPre === YS3 || idPre === YS4) {
      all.actualRoute = all.middleRoute2;
    } else if (idPre === MO || idPre === YS0 || idPre === YS1 || idPre === YS7 || idPre === YS8) {
      all.actualRoute = all.middleRoute1;
    } else {
      all.actualRoute = all.longRoute;
    };
    // take the initial location (idPre), add the rollTotal, get the final location.
    indexAfterShift = all.actualRoute.indexOf(idPre) + rollTotal;  // this number is the index number of where the dice have positioned us
    // the reason why we need this number is in case the dice take us beyond the final index.

    console.log(all.actualRoute);
    console.log(indexAfterShift);


    if (indexAfterShift > all.actualRoute.indexOf(HOME)) {
      return firstHome();
    } else {


      idPost = all.actualRoute[indexAfterShift];
      if (idPost.innerText === notMal) {
        if (mal === "X") {
          MALO.innerText = MALO.innerText + idPost.innerText;
        } else {
          MALX.innerText = MALX.innerText + idPost.innerText
        };
        turn--;
      }

      if (idPost.innerText === mal) {
        idPost.innerText = dMal;
        idPre.innerText = "";
        return chooseMalAndRoute();
      } else if (idPost.innerText === notDMal && idPre.innerText === dMal) {
        if (mal === "X") {
          MALO.innerText = "OO";
        } else {
          MALX.innerText = "XX";
        };
        turn--;
        idPost.innerText = dMal;
        idPre.innerText = "";
        return chooseMalAndRoute();
      } else if (idPost.innerText === notDMal && idPre.innerText === mal) {
        all.actualRoute[all.actualRoute.indexOf(idPost) - 1].innerText = mal;
        idPre.innerText = "";
        return chooseMalAndRoute();
      } else if (idPre === all.longRoute[0]) {
        idPost.innerText = mal;
        if (idPre.innerText === mal) {
          idPre.innerText = "";
        } else {
          idPre.innerText = mal;
        }
        return chooseMalAndRoute();
      }

      idPost.innerText = idPre.innerText;
      idPre.innerText = "";

    };
    chooseMalAndRoute();
  }

  function firstHome() {
    if (idPre.innerText === dMal) {
      END.innerText = END.innerText + mal;
      return gameOver();
    }

    if (mal === "X") {
      xWins ++;
    } else {
      oWins ++;
    }

    if (xWins === 2 || oWins === 2) {
      return gameOver();
    } else {
      idPre.innerText = "";
      END.innerText = END.innerText + mal;
      chooseMalAndRoute();
    }

  }

  function gameOver() {
    END.innerText = END.innerText + mal;
    idPre.innerText = "";
    console.log(mal + " WINS!");
    alert (mal + " WON!");
  };

}; // END
