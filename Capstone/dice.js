// Async try...catch function to get JSON data
async function getAPIData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//Isolate hotel data in JSON from extranious metadata

let theData = {};
getAPIData("/Capstone/dice.json").then(data => (theData = data));

//Greating for player
openerArray = [
  "Hey, friend. Wanna play some dice?",
  "Care to throw down in a game of dice?",
  "Step right up, get your butt kicked in a game of dice.",
  "Let's just see if you're lucky enough to beat me in a game of dice.",
  "Got guts? Roll some dice.",
  "Care for a game of dice? If you think you can beat me, that is."
];

//The top of screen changing challenge to the player
let challenge = document.querySelector("#greeting");
const taunt = openerArray[Math.floor(Math.random() * openerArray.length)];
challenge.textContent = taunt;

let numberGen = function(max, min) {
  let number = Math.floor(Math.random() * (max - min)) + min;
  return number;
};

//Function for the computer to pick between odd and even for their bet
function oddEven() {
  let number = Math.floor(Math.random() * 2);
  if (number % 2 == 0) return "even";
  else return "odd";
}

//Function to check if value is odd or even
function isEven(value) {
  if (value % 2 == 0) return true;
  else return false;
}

//Get sum of array
arrSum = function(arr) {
  return arr.reduce(function(a, b) {
    return a + b;
  }, 0);
};

//Game structure and message window setup

var playerTotal = [0];
var computerTotal = [0];
let turn = 1;
let gameBoard = document.querySelector("#gameBoard");
let gameStart = document.createElement("button");
gameStart.textContent = "Let's Play!";
let playerPoints = document.createElement("p");
let computerPoints = document.createElement("p");
let roll = document.createElement("p");
let yourBet = "odd";
let compBet = "even";
gameBoard.appendChild(gameStart);
let endTurn = document.createElement("button");
endTurn.textContent = "End Turn";
endTurn.style.display = "none";
endTurn.addEventListener("click", () => {
  endTurn.style.display = "none";
  yourRoll.style.display = "none";
  turn++;
  computerTurn();
});

//Settings for betting odd or even
let oddBet = document.createElement("button");
oddBet.textContent = "Odd";
oddBet.addEventListener("click", () => {
  yourBet = "odd";
  evenBet.style.display = "none";
  oddBet.style.display = "none";
  contButton.style.display = "block";
});
let evenBet = document.createElement("button");
evenBet.textContent = "Even";
oddBet.addEventListener("click", () => {
  yourBet = "even";
  evenBet.style.display = "none";
  oddBet.style.display = "none";
  contButton.style.display = "block";
});
evenBet.style.display = "none";
oddBet.style.display = "none";

//Running totals
let introArea = document.querySelector("#topInfo");
let runningTotals = document.createElement("div");
runningTotals.setAttribute("class", "totals");
let displayUserTotal = document.createElement("p");
let displayCompTotal = document.createElement("p");
displayUserTotal.textContent = `Player: ${arrSum(playerTotal)}`;
displayCompTotal.textContent = `Computer: ${arrSum(computerTotal)}`;
introArea.appendChild(runningTotals);
runningTotals.appendChild(displayUserTotal);
runningTotals.appendChild(displayCompTotal);

//the Odd, Even, Roll menu. When your turn, you roll. When Computer's turn, you pick odd or even.
let oddevenWindow = document.createElement("div");
let message = document.createElement("h2");
oddevenWindow.setAttribute("class", "messageBox");
oddevenWindow.appendChild(message);
gameBoard.appendChild(oddevenWindow);
oddevenWindow.appendChild(oddBet);
oddevenWindow.appendChild(evenBet);
gameBoard.appendChild(oddevenWindow);
oddevenWindow.style.display = "none";
let contButton = document.createElement("button");
contButton.textContent = "Continue";
contButton.addEventListener("click", () => {
  turn++
  contButton.style.display = "none";
  game();
});
oddevenWindow.appendChild(contButton);
contButton.style.display = "none";
let yourRoll = document.createElement("button");
yourRoll.textContent = "ROLL";
yourRoll.addEventListener("click", () => {
  rollDice("player");
  updateInfo.textContent = rollDice("player");
  yourRoll.style.display = "none";
  endTurn.style.display = "block";
});
oddevenWindow.appendChild(endTurn);
oddevenWindow.appendChild(yourRoll);

//Computer roll
function computerTurn() {
  message.textContent = `My turn. Choose your bet.`;
    evenBet.style.display = "block";
  oddBet.style.display = "block";
  //Here, we need to figure out a way to have the computer roll, and then return the roll and add it to their total
  //Following that, how to add 5 points for a correct guess
  rollDice("computer");
  if (isEven(compRoll) === true && yourBet === "even") {
    playerTotal.push(5);
    computerTotal.push(compRoll);
    updateInfo.textContent = compRoll;
  } else if (isEven(compRoll) === false && yourBet === "odd") {
    playerTotal.push(5);
    computerTotal.push(compRoll);
    updateInfo.textContent = compRoll;
  } else {
    computerTotal.push(compRoll);
    updateInfo.textContent = compRoll;
  }
}

function rollDice(user) {
  let die1 = numberGen(7, 1);
  let die2 = numberGen(7, 1);
  let rollSum = die1 + die2;
  addToTotal(user, rollSum);
  //Here, go to j.son to show pictures of both dice based on number rolled
//   return `Your roll is ${die1} and ${die2}. That's a total of ${rollSum} points.`;
}

function addToTotal(user, sum) {
  if (user === "player") {
    playerTotal.push(sum);
    displayUserTotal.textContent = `Player: ${arrSum(playerTotal)}`;
    console.log(playerTotal);
  } else {
    computerTotal.push(sum);
    displayCompTotal.textContent = `Computer: ${arrSum(computerTotal)}`;
  }
}

//Last action message
let update = document.createElement("div");
let updateInfo = document.createElement("p");
gameBoard.appendChild(update);
update.appendChild(updateInfo);

//Function to start game
gameStart.addEventListener("click", () => {
  console.log(theData)  
  game();
});

function game() {
  if (arrSum(playerTotal) < 100 || arrSum(computerTotal) < 100) {
    if (isEven(turn) === false) {
      if (turn === 1) {
        gameStart.remove();
        computerBet = oddEven();
        message.textContent = `You go first! I bet ${computerBet}.`;
        oddevenWindow.style.display = "block";
        runningTotals.style.display = "block";
        yourRoll.style.display = "block";
        console.log(turn);
      } else {
        computerBet = oddEven();
        message.textContent = `Your turn. I bet ${computerBet}`;
        evenBet.style.display = "none";
        oddBet.style.display = "none";
        oddevenWindow.style.display = "block";
        yourRoll.style.display = "block";
      }
    } else {
      computerTurn();
    }
  } else {
    if (playerTotal > 100) {
      updateInfo.textContent = "YOU WIN!";
      oddevenWindow.remove();
    } else {
      updateInfo.textContent = "Computer wins!";
      oddevenWindow.remove();
    }
  }
}

// gameBoard.appendChild(roll);
// roll.textContent = `Your roll is ${die1} and ${die2}. That's a total of ${rollSum} points.`;
// playerPoints.textContent = `Total: ${playerTotal}`;
// gameBoard.appendChild(playerPoints);

//Possible ideas: have it edit a text file to keep track of its global wins and losses?
//Have serious mode where it admits defeat if you beat it three times in a row?

// Sound play

// let fallSound = new Audio ('/Unit08/assets/losingHorn.mp3')
// fallSound.play()

// //Async try...catch function to get JSON data

// async function getAPIData(URL) {
//     try {
//       const response = await fetch(URL);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   //Isolate hotel data in JSON from extranious metadata

//   let theData = {};
//   getAPIData().then(data => (theData = data));
