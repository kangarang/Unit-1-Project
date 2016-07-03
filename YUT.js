document.addEventListener("DOMContentLoaded", start)


function start(){
  console.log("DOMContentLoaded");
  var button = document.querySelector("button");
  var moveButt = document.querySelector("#MOVE");
  var resetButt = document.querySelector("#resetButt")
  var allRoutes = {};
  var mal;
  var dMal;
  var notDMal;
  var notMal;
  var rollValue = 0;
  var rollTotal = 0;
  var rollKorean;
  var turn = 0;
  var oldIndex;
  var oldDOMSpot;
  var newIndex;
  var newDOMSpot;
  var wins = 0;
  var firstBinary = document.querySelector("#firstBinary");
  var secBinary = document.querySelector("#secBinary");
  var actualRoute;
  var notRoute;
  var ENDX = document.querySelector("#ENDX");
  var ENDO = document.querySelector("#ENDO")


  function resetGame(){
    turn = 0;
    rollTotal = 0;
    rollValue = 0;
    for (route in allRoutes) {
      for (var i=0; i<allRoutes[route].length; i++){
        allRoutes[route][i].innerText = "";
      }
      TITLE.innerText = "Yut Nori!";
    }
    ENDX.innerText = "";
    ENDO.innerText = "";
    MALX.innerText = "X";
    MALO.innerText = "O";
    firstBinary.innerText = "";
    secBinary.innerText = "";
    chooseMalAndRoute();
  }

  allRoutes.fullRoute = [MALX, DO, GAE, GEOL, YUT, MO, Y6, Y7, Y8, Y9, Y10, Y11, Y12, Y13, Y14, Y15, Y16, Y17, Y18, Y19, HOME, ENDX];
  strFullRoute = ["MALX", "DO", "GAE", "GEOL", "YUT", "MO", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Home", "ENDX"];
  allRoutes.fullORoute = [MALO, DO, GAE, GEOL, YUT, MO, Y6, Y7, Y8, Y9, Y10, Y11, Y12, Y13, Y14, Y15, Y16, Y17, Y18, Y19, HOME, ENDO];
  strFullORoute = ["MALO", "DO", "GAE", "GEOL", "YUT", "MO", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Home", "ENDO"];

  allRoutes.firstDiagRoute = [MO, YS0, YS1, YS2, YS7, YS8, Y15, Y16, Y17, Y18, Y19, HOME, ENDX];
  stringFirstDiagRoute = ["MO","YS0", "YS1", "YS2", "YS7", "YS8", "Y15", "Y16", "Y17", "Y18", "Y19", "Home", "ENDX"];

  allRoutes.secondDiagRoute = [Y10, YS5, YS6, YS2, YS3, YS4, HOME, ENDX];
  stringSecondDiagRoute = ["Y10", "YS5", "YS6", "YS2", "YS3", "YS4", "Home", "ENDX"];

  allRoutes.shortestRoute = [YS2, YS3, YS4, HOME, ENDX];
  stringShortestRoute = ["YS2", "YS3", "YS4", "Home", "ENDX"];

  chooseMalAndRoute();

  function chooseMalAndRoute() {
    resetButt.addEventListener("click", resetGame);

    turn ++;
    if (turn%2 === 0){
      mal = "X";
      dMal = "XX"
      notMal = "O"
      notDMal = "OO"
      actualRoute = allRoutes.fullRoute;
      actualStringRoute = strFullRoute;
      notRoute = allRoutes.fullORoute;
    } else {
      mal = "O"
      dMal = "OO"
      notMal = "X"
      notDMal = "XX"
      actualRoute = allRoutes.fullORoute;
      actualStringRoute = strFullORoute;
      notRoute = allRoutes.fullRoute;

    }
    firstNum.innerText = "Mal: " + mal;
    secNum.innerText = "";

    button.addEventListener("click", roll);
  }


  function roll() {
    button.removeEventListener("click", roll)
    var rollOne = Math.round(Math.random());
    var rollTwo = Math.round(Math.random());
    var rollThree = Math.round(Math.random());
    var rollFour = Math.round(Math.random());
    console.log(rollOne);
    console.log(rollTwo);
    console.log(rollThree);
    console.log(rollFour);
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
      console.log("Your rolled Mo!");
      // roll()
    }
    secNum.innerText = rollKorean;

    moveButt.addEventListener("click", movMal)
  }

  function movMal(){
    moveButt.removeEventListener("click", movMal)
    if (HOME.innerText === mal){
      console.log(mal + " WINS!");
      actualRoute[21].innerText = mal;
      oldDOMSpot.innerText = "";
      return overMessage();
    } else {
      for (var i=0; i< allRoutes.secondDiagRoute.length; i++) {
        if (allRoutes.secondDiagRoute[i].innerText == mal && allRoutes.secondDiagRoute[i].id == stringSecondDiagRoute[i]) {
          oldIndex = i;
          oldDOMSpot = allRoutes.secondDiagRoute[i];
          if (oldDOMSpot === Y10) {
            newIndex = rollTotal
          } else {
            newIndex = i + rollTotal;
          }
          if (newIndex >= 7) {
            return overMessage();
          } else {
            newDOMSpot = allRoutes.secondDiagRoute[newIndex];
            newDOMSpot.innerText = mal;
            oldDOMSpot.innerText = "";
            return chooseMalAndRoute()
          }
        }
      }
      for (var i=0; i< actualRoute.length; i++){
        if (actualRoute[i].innerText == mal && actualRoute[i].id == actualStringRoute[i]) {
          oldIndex = i;
          oldDOMSpot = actualRoute[i];
          if (oldDOMSpot === MO) {
            return firstCornerSpot();
          } else {
            newIndex = i + rollTotal;
            if (newIndex >= 21) {
              return overMessage();
            } else {
              newDOMSpot = actualRoute[newIndex];
              if (newDOMSpot.innerText === notMal){
                notRoute[0].innerText = notMal;
              }
              newDOMSpot.innerText = mal;
              oldDOMSpot.innerText = "";
              return chooseMalAndRoute();
            }
          }
        }
      }

      for (var i=0; i< allRoutes.firstDiagRoute.length; i++) {
        if (allRoutes.firstDiagRoute[i].innerText == mal && stringFirstDiagRoute[i] == allRoutes.firstDiagRoute[i].id) {
          oldIndex = i;
          oldDOMSpot = allRoutes.firstDiagRoute[i];
          if (oldDOMSpot === YS2){
            return shortestRoute();
          } else {
            newIndex = i + rollTotal;
            if (newIndex >= 12) {
              return overMessage();
            } else {
              newDOMSpot = allRoutes.firstDiagRoute[newIndex];
              newDOMSpot.innerText = mal;
              oldDOMSpot.innerText = "";
              return chooseMalAndRoute();
            }
          }
        }
      }
    }
  }

function firstCornerSpot() {
  newIndex = rollTotal;
  newDOMSpot = allRoutes.firstDiagRoute[newIndex];
  if (newDOMSpot.innerText === notMal){
    notRoute[0].innerText = notMal;
  }
  newDOMSpot.innerText = mal;
  oldDOMSpot.innerText = "";
  return chooseMalAndRoute();
}

function shortestRoute() {
  newIndex = rollTotal + 3;
  if (newIndex >= 7) {
    return overMessage();
  } else {
    newDOMSpot = allRoutes.secondDiagRoute[newIndex];
    if (newDOMSpot.innerText === notMal){
      notRoute[0].innerText = notMal;
    }
    newDOMSpot.innerText = mal;
    oldDOMSpot.innerText = "";
    chooseMalAndRoute()
  }
}

function overMessage(){
  console.log(mal + " WINS!");
  actualRoute[21].innerText = mal;
  oldDOMSpot.innerText = "";
  alert (mal + " WON!")
  wins ++;
  HOME.innerText = "";
}

// END
};
