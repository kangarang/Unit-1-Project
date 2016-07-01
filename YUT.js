document.addEventListener("DOMContentLoaded", start)


function start(){
  console.log("DOMContentLoaded");
  var button = document.querySelector("button");
  var moveButt = document.querySelector("#MOVE")
  var allRoutes = {};
  var mal;
  var dMal;
  var notDMal;
  var notMal;
  var rollValue = 0;
  var notRoute;
  var rollTotal = 0;
  var rollKorean;
  var click_count = 0;

  var turn = 0;
  var oldIndex;
  var oldDOMSpot;
  var newIndex;
  var newDOMSpot;
  var wins = 0;
  var firstBinary = document.querySelector("#firstBinary");
  var secBinary = document.querySelector("#secBinary");
  var actualRoute;

  allRoutes.fullRoute = [MALX, DO, GAE, GEOL, YUT, MO, Y6, Y7, Y8, Y9, Y10, Y11, Y12, Y13, Y14, Y15, Y16, Y17, Y18, Y19, HOME];
  allRoutes.strFullRoute = ["MALX", "DO", "GAE", "GEOL", "YUT", "MO", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Home"];
  allRoutes.fullORoute = [MALO, DO, GAE, GEOL, YUT, MO, Y6, Y7, Y8, Y9, Y10, Y11, Y12, Y13, Y14, Y15, Y16, Y17, Y18, Y19, HOME];
  allRoutes.strFullORoute = ["MALO", "DO", "GAE", "GEOL", "YUT", "MO", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Home"];

  allRoutes.firstDiagRoute = [MO, YS0, YS1, YS2, YS7, YS8, Y15, Y16, Y17, Y18, Y19, HOME];
  allRoutes.stringFirstDiagRoute = ["MO","YS0", "YS1", "YS2", "YS7", "YS8", "Y15", "Y16", "Y17", "Y18", "Y19", "Home"];

  allRoutes.secondDiagRoute = [Y10, YS5, YS6, YS2, YS3, YS4, HOME];
  allRoutes.stringSecondDiagRoute = ["Y10", "YS5", "YS6", "YS2", "YS3", "YS4", "Home"];

  allRoutes.shortestRoute = [YS2, YS3, YS4, HOME];
  allRoutes.stringShortestRoute = ["YS2", "YS3", "YS4", "Home"];

myClick()
  chooseMalAndRoute();

  function chooseMalAndRoute() {
    turn ++;
    if (turn%2 === 0){
      mal = "X";
      dMal = "XX"
      notMal = "O"
      notDMal = "OO"
      actualRoute = allRoutes.fullRoute;
      actualStringRoute = allRoutes.strFullRoute;
      notRoute = allRoutes.fullORoute;

    } else {
      mal = "O"
      dMal = "OO"
      notMal = "X"
      notDMal = "XX"
      actualRoute = allRoutes.fullORoute;
      actualStringRoute = allRoutes.strFullORoute;
      notRoute = allRoutes.fullRoute;
    }
    firstNum.innerText = "Mal: " + mal;
    secNum.innerText = "";

    firstNumm.innerText = "Roll value: "
    button.addEventListener("click", roll);

  }

  function myClick(event) {
    click_count++;
    if(click_count == 1){
      moveButt.removeEventListener("click", movMal)
      button.removeEventListener("click", roll)

    }
  }



  function roll() {
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
    firstNumm.innerText = "Roll value: " + rollTotal

    // moveMal();
    moveButt.addEventListener("click", movMal)
  }

  function movMal(){
    for (var i=0; i< allRoutes.secondDiagRoute.length; i++) {
      if (allRoutes.secondDiagRoute[i].innerText.includes(mal) && allRoutes.secondDiagRoute[i].id == allRoutes.stringSecondDiagRoute[i]) {
        oldIndex = i;
        oldDOMSpot = allRoutes.secondDiagRoute[i];
        newIndex = i + rollTotal;
        if (oldDOMSpot === Y10) {
          newIndex = rollTotal
        }
        if (newIndex >= allRoutes.stringSecondDiagRoute.indexOf("Home")) {
          console.log(mal + " WINS!");
          actualRoute[0].innerText = mal;
          oldDOMSpot.innerText = "";
          return overMessage();
        }
        newDOMSpot = allRoutes.secondDiagRoute[newIndex];
        newDOMSpot.innerText = mal;
        oldDOMSpot.innerText = "";
        return chooseMalAndRoute()
      }
    }
    for (var i=0; i< actualRoute.length; i++){
      if (actualRoute[i].innerText.includes(mal) && actualRoute[i].id == actualStringRoute[i]) {
        oldIndex = i;
        oldDOMSpot = actualRoute[i];

        if (oldDOMSpot === MO) {
          return firstCornerSpot();
        }

        newIndex = i + rollTotal;

        if (newIndex >= actualStringRoute.indexOf("Home")) {
          console.log(mal + " WINS!");
          actualRoute[0].innerText = mal;
          oldDOMSpot.innerText = "";
          return overMessage();
        }

        newDOMSpot = actualRoute[newIndex];

        if (newDOMSpot.innerText === notMal){
          notRoute[0].innerText = notMal;
        }

        newDOMSpot.innerText = mal;
        oldDOMSpot.innerText = "";

        return chooseMalAndRoute();
      }
    }

    for (var i=0; i< allRoutes.firstDiagRoute.length; i++) {
      if (allRoutes.firstDiagRoute[i].innerText.includes(mal) && allRoutes.stringFirstDiagRoute[i] == allRoutes.firstDiagRoute[i].id) {
        oldIndex = i;
        oldDOMSpot = allRoutes.firstDiagRoute[i];

        if (oldDOMSpot === YS2){
          newIndex = rollTotal;
          return shortestRoute();
        }
        newIndex = i + rollTotal;

        if (newIndex >= allRoutes.stringFirstDiagRoute.indexOf("Home")) {
          console.log(mal + " WINS!");
          actualRoute[0].innerText = mal;
          oldDOMSpot.innerText = "";
          return overMessage();
        }

        newDOMSpot = allRoutes.firstDiagRoute[newIndex];
        newDOMSpot.innerText = mal;
        oldDOMSpot.innerText = "";
        return chooseMalAndRoute();
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

  if (newIndex >= allRoutes.stringShortestRoute.indexOf("Home")) {
    console.log(mal + " WINS!");
    actualRoute[0].innerText = mal;
    oldDOMSpot.innerText = "";
    return overMessage();
  }
  newDOMSpot = allRoutes.shortestRoute[newIndex];
  if (newDOMSpot.innerText === notMal){
    notRoute[0].innerText = notMal;
  }
  newDOMSpot.innerText = mal;
  oldDOMSpot.innerText = "";
  chooseMalAndRoute()
}

function overMessage(){
  alert (mal + " WON!")
  wins ++;
  HOME.innerText = "";
  actualRoute[0].innerText = mal;
}




// END
};

  // function moveMal() {
  //   var nowSpot;
  //   for (var i=0; i< actualRoute.length; i++){
  //     if (actualRoute[i].innerText.includes(mal)) {
  //       nowSpot = actualRoute[i].id;
  //     }
  //   }
  //   for (var i=0; i< allRoutes.secondDiagRoute.length; i++) {
  //     if (allRoutes.secondDiagRoute[i].innerText.includes(mal)) {
  //       nowSpot = allRoutes.secondDiagRoute[i].id;
  //     }
  //   }
  //   for (var i=0; i< allRoutes.firstDiagRoute.length; i++) {
  //     if (allRoutes.firstDiagRoute[i].innerText.includes(mal)) {
  //       nowSpot = allRoutes.firstDiagRoute[i].id;
  //     }
  //   }
  //
  //   var typed = prompt("You rolled a "+rollTotal+ ", or " + rollKorean + "! Which " + mal + " do you want to move? (Type '" + nowSpot + "')").toUpperCase();
  //
  //   for (var i=0; i< allRoutes.secondDiagRoute.length; i++) {
  //     if (allRoutes.secondDiagRoute[i].innerText === mal && typed === allRoutes.stringSecondDiagRoute[i]) {
  //       oldIndex = i;
  //       oldDOMSpot = allRoutes.secondDiagRoute[i];
  //       newIndex = i + rollTotal;
  //       if (newIndex > allRoutes.stringSecondDiagRoute.indexOf("Home")) {
  //         console.log(mal + " WINS!");
  //         actualRoute[0].innerText = mal;
  //         oldDOMSpot.innerText = "";
  //         return overMessage();
  //       }
  //       newDOMSpot = allRoutes.secondDiagRoute[newIndex];
  //       newDOMSpot.innerText = mal;
  //       oldDOMSpot.innerText = "";
  //       chooseMalAndRoute()
  //     }
  //   }
  //
  //   for (var i = 0; i < actualRoute.length; i++) {
  //     if (actualRoute[i].innerText === mal && typed === actualStringRoute[i]) {
  //       oldIndex = i;
  //       oldDOMSpot = actualRoute[i];
  //
  //       if (oldDOMSpot === MO) {
  //         return firstCornerSpot();
  //       }
  //
  //       newIndex = i + rollTotal;
  //
  //       if (newIndex > actualStringRoute.indexOf("Home")) {
  //         console.log(mal + " WINS!");
  //         actualRoute[0].innerText = mal;
  //         oldDOMSpot.innerText = "";
  //         return overMessage();
  //       }
  //
  //       newDOMSpot = actualRoute[newIndex];
  //
  //       if (newDOMSpot.innerText === notMal){
  //         notRoute[0].innerText = notMal;
  //       }
  //
  //       newDOMSpot.innerText = mal;
  //       oldDOMSpot.innerText = "";
  //
  //       chooseMalAndRoute();
  //       }
  //     }
  //
  //     for (var i = 0; i < allRoutes.firstDiagRoute.length; i++ ) {
  //       if (allRoutes.firstDiagRoute[i].innerText === mal && typed === allRoutes.stringFirstDiagRoute[i]) {
  //         oldIndex = i;
  //         oldDOMSpot = allRoutes.firstDiagRoute[i];
  //
  //         if (oldDOMSpot === YS2){
  //           shortestRoute();
  //         }
  //         newIndex = i + rollTotal;
  //
  //         if (newIndex > allRoutes.stringFirstDiagRoute.indexOf("Home")) {
  //           console.log(mal + " WINS!");
  //           actualRoute[0].innerText = mal;
  //           oldDOMSpot.innerText = "";
  //           return overMessage();
  //         }
  //
  //         newDOMSpot = allRoutes.firstDiagRoute[newIndex];
  //         newDOMSpot.innerText = mal;
  //         oldDOMSpot.innerText = "";
  //         chooseMalAndRoute();
  //       }
  //     }
  //   }



// MORE


  // function roll() {
  //   rollValue = Math.floor(Math.random()*(5-1)) + 1;
  //   console.log("roll Value = " + rollValue);
  //   if (turn%2 === 0){
  //     mal = "X";
  //   } else {
  //     mal = "O"
  //   }
  //
  //   moveMal();
  // }
  //
  // function moveMal() {
  //
  //
  //   for (route in allRoutes) {
  //     var oldIndex;
  //     var newIndex;
  //
  //   }
    // if (allRoutes.hasOwnProperty(route) && allRoutes[route].includes(typed)){
    //   oldIndex = allRoutes[route].indexOf(typed);
    //   console.log(oldIndex);
    //   allRoutes[route][oldIndex + rollValue] = typed;
    //   newIndex = allRoutes[route][oldIndex + rollValue];
    //   console.log(newIndex);
    //   allRoutes[route][newIndex] = mal;
    //
    //   var oldSpot = document.getElementById(typed);
    //   allRoutes[route][currendex] = "";
    //   oldSpot.innerText = "";
    //   var newSpot = document.getElementById(typed);
    // }


    //
    //     if (route.indexOf(typed)) {
    //
    //       var currentIndex = allRoutes[route].indexOf(typed);
    //       // allRoutes[squareRoute].indexOf(typed) = "";
    //       allRoutes[specificRoute][currentIndex + rollValue] = typed;
    //       console.log(currentIndex);
    //       // squareRoute[3] = typed
    //       // domType.innerText = typed;
    //
    //     } else{
    //       console.log("HWAT???");
    //     }
    //   }
    //
    // }

    // for (var i=0; i < allRoutes.squareRoute.length; i++) {
    //   if (allRoutes.squareRoute.indexOf(typed)) {
    //     var currentIndex = allRoutes.squareRoute.indexOf(typed)
    //     allRoutes.squareRoute[currentIndex + rollValue] = typed
    //   }
    // }

    // if (routeArray.indexOf(typed)){
    //   routeArray[.indexOf(typed) + ROLLVALUE] = Mal
    // }
    // return typed;
