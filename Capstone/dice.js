/*-- Utility functions --*/

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

/*-- Game parts and definitions --*/

//Game start initial structure and message window setup
var playerTotal = [0];
var computerTotal = [0];
let turn = 1;
let gameBoard = document.querySelector("#gameBoard");
let gameStart = document.createElement("button");
gameStart.textContent = "Let's Play!";
let currentBet = "";
gameBoard.appendChild(gameStart);

//oddevenWindow ----the Odd, Even, Roll menu. When your turn, you roll. When Computer's turn, you pick odd or even.
let oddevenWindow = document.createElement("div");
let message = document.createElement("h2");
oddevenWindow.setAttribute("class", "messageBox");
oddevenWindow.appendChild(message);
gameBoard.appendChild(oddevenWindow);
gameBoard.appendChild(oddevenWindow);
oddevenWindow.style.display = "none";

//End turn and Continue buttons to officialy switch turns
let endTurn = document.createElement("button");
endTurn.textContent = "End Turn";
endTurn.style.display = "none";
endTurn.addEventListener("click", () => {
  endTurn.style.display = "none";
  yourRoll.style.display = "none";
  updateInfo.textContent = ""
  updateTotals();
  turn++;
  game();
});
let contButton = document.createElement("button");
contButton.textContent = "Continue";
contButton.addEventListener("click", () => {
  contButton.style.display = "none";
  updateInfo.textContent = ""
  updateTotals();
  turn++;
  game();
});
oddevenWindow.appendChild(contButton);
contButton.style.display = "none";

//Running totals to display in the upper right
let introArea = document.querySelector("#topInfo");
let runningTotals = document.createElement("div");
runningTotals.setAttribute("class", "totals");
let displayPlayerTotal = document.createElement("p");
let displayCompTotal = document.createElement("p");
displayPlayerTotal.textContent = `Player: ${arrSum(playerTotal)}`;
displayCompTotal.textContent = `Computer: ${arrSum(computerTotal)}`;
introArea.appendChild(runningTotals);
runningTotals.appendChild(displayPlayerTotal);
runningTotals.appendChild(displayCompTotal);

//evenBet oddBet ---Settings for betting odd or even
let oddBet = document.createElement("button");
oddBet.textContent = "Odd";
oddBet.addEventListener("click", () => {
  evenBet.style.display = "none";
  oddBet.style.display = "none";
  contButton.style.display = "block";
  rollDice("computer", "odd");
});
let evenBet = document.createElement("button");
evenBet.textContent = "Even";
evenBet.addEventListener("click", () => {
  evenBet.style.display = "none";
  oddBet.style.display = "none";
  contButton.style.display = "block";
  rollDice("computer", "even");
});
evenBet.style.display = "none";
oddBet.style.display = "none";
oddevenWindow.appendChild(oddBet);
oddevenWindow.appendChild(evenBet);

//yourRoll -----button to roll dice button/function, display end turn
let yourRoll = document.createElement("button");
yourRoll.textContent = "ROLL";
oddevenWindow.appendChild(endTurn);
oddevenWindow.appendChild(yourRoll);
yourRoll.addEventListener("click", () => {
  console.log(`yourRoll says the bet is ${currentBet}`)
  playerRoll(currentBet);
});

//Last action message window
let update = document.createElement("div");
let updateInfo = document.createElement("p");
gameBoard.appendChild(update);
update.appendChild(updateInfo);

//Button to start game
gameStart.addEventListener("click", () => {
  console.log("This is the JSON data:" + theData);
  game();
});

/*-- Game functions --*/

//main game function, victory condition
function game() {
  console.log(
    `End of turn. Player total is: ${arrSum(playerTotal)}. Computer's total is: ${arrSum(computerTotal)}.`
  );
  if (arrSum(playerTotal) < 100 && arrSum(computerTotal) < 100) {
    if (isEven(turn) === false) {
      console.log(`Turn ${turn}. Player's turn.`);
      yourTurn();
    } else {
      console.log(`Turn ${turn}. Computer's turn.`);
      computerTurn();
    }
  } else if (arrSum(playerTotal) > 100) {
    updateInfo.textContent = "YOU WIN!";
    message.textContent = "Game over!";
    oddevenWindow.remove();
  } else if (arrSum(computerTotal) > 100) {
    updateInfo.textContent = "Computer wins!";
    message.textContent = "Game over!";
    oddevenWindow.remove();
  }
}

//Your turn function that governs what happens on odd numbered turns.
function yourTurn() {
  if (turn === 1) {
    gameStart.remove();
    computerBet = oddEven();
    message.textContent = `You go first! I bet ${computerBet}.`;
    currentBet = computerBet;
    oddevenWindow.style.display = "block";
    runningTotals.style.display = "block";
    yourRoll.style.display = "block";
    } else {
      computerBet = oddEven();
    message.textContent = `Your turn. I bet ${computerBet}.`;
    currentBet = computerBet;
    evenBet.style.display = "none";
    oddBet.style.display = "none";
    oddevenWindow.style.display = "block";
    yourRoll.style.display = "block";
    }
  }


function playerRoll(computerBet){
  thisRoll = rollDice("player", computerBet);
  die1 = thisRoll[0];
  die2 = thisRoll[1];
  rollSum = thisRoll[2];
  updateInfo.textContent = `Your roll is ${die1} and ${die2}. That's a total of ${rollSum} points.`;
  yourRoll.style.display = "none";
  endTurn.style.display = "block";
}

//rollDice ----Dice roll rules called by roll button or computer function.
function rollDice(user, bet) {
  let die1 = numberGen(7, 1);
  let die2 = numberGen(7, 1);
  let rollSum = die1 + die2;
  if (user === "player") {
    addtoTotal(user, rollSum);
    betCheck("computer", bet, rollSum);
    updateTotals();
    updateInfo.textContent = `${user.charAt(0).toUpperCase() +
      user.slice(
        1
      )}'s roll is ${die1} and ${die2}. That's a total of ${rollSum} points.`;
    return [die1, die2, rollSum];
  } else if (user === "computer") {
    addtoTotal(user, rollSum);
    betCheck("player", bet, rollSum);
    updateTotals();
    updateInfo.textContent = `${user.charAt(0).toUpperCase() +
      user.slice(
        1
      )}'s roll is ${die1} and ${die2}. That's a total of ${rollSum} points.`;
    return [die1, die2, rollSum];
  } 
  // else if (die1 === 1 && die2 === 1 && user == "player"){
  //   endTurn.style.display = "none"
  //   yourRoll.style.display = "block" 
  //   message.textContent = `Rolled snake eyes. ${user} goes again.`;
     
  // }else if (die1 === 1 && die2 === 1 && user == "computer") {
  //   message.textContent = `Rolled snake eyes. ${user} goes again.`;
  //   computerTurn();
  // }
  //Here, go to j.son to show pictures of both dice based on number rolled

}

//check if you or computer bet correctly, and award points accordingly
function betCheck(better, bet, roll) {
  checkRoll = isEven(roll);
  console.log(`The bet is ${bet} for the ${better}.`);
  if (
    (checkRoll === true && bet === "even" && better === "computer") ||
    (checkRoll === false && bet === "odd" && better === "computer")
  ) {
    console.log(`Computer wins the bet.`);
    addtoTotal("computer", 5);
    message.textContent = "Ha! I won the bet. 5 points for me.";
    updateTotals();
  } else if (
    (checkRoll === true && bet === "even" && better === "player") ||
    (checkRoll === false && bet === "odd" && better === "player")
  ) {
    console.log(`Player wins the bet.`);
    addtoTotal("player", 5);
    message.textContent = "You won the bet this time. 5 points.";
    updateTotals();
  } else if (
    (checkRoll === true && bet === "odd" && better === "player") ||
    (checkRoll === false && bet === "even" && better === "player")
  ) {
    message.textContent = "Wrong! No points for you.";
    console.log(`Player loses the bet.`);
    console.log(`The player's total remains ${arrSum(playerTotal)}`);
  } else if (
    (checkRoll === true && bet === "odd" && better === "computer") ||
    (checkRoll === false && bet === "even" && better === "computer")
  ) {
    message.textContent = "I guessed wrong. Next time.";
    console.log(`Computer loses the bet.`);
    console.log(`The computer's total remains ${arrSum(computerTotal)}`);
  }
}

//Computer roll
function computerTurn() {
  message.textContent = `My turn. Choose your bet.`;
  //In Even and Odd bet is the trigger for rolling the dice for the computer
  evenBet.style.display = "block";
  oddBet.style.display = "block";
}

function turnMessage() {
  if (isEven(turn) === false) {
    message.textContent = "YOUR TURN";
  } else {
    message.textContent = "COMPUTER'S TURN";
  }
}

function addtoTotal(user, amount) {
  if (user === "player") {
    playerTotal.push(amount);
  } else {
    computerTotal.push(amount);
  }
  updateLog();
}

function updateTotals() {
  displayPlayerTotal.textContent = `Player: ${arrSum(playerTotal)}`;
  displayCompTotal.textContent = `Computer: ${arrSum(computerTotal)}`;

}

function updateLog () {
  console.log(`The computer's scores are ${computerTotal}`);
  console.log(`The players's scores are ${playerTotal}`);
}

function checkTotal(user) {
  if (user > 100) return true
}

// Optional function to just be called and add to total
// function addToTotal(user, sum) {
//   if (user === "player") {
//     playerTotal.push(sum);
//     displayPlayerTotal.textContent = `Player: ${arrSum(playerTotal)}`;
//     console.log(`Player's total ${playerTotal}`);
//   } else if (user === "computer") {
//     computerTotal.push(sum);
//     displayCompTotal.textContent = `Computer: ${arrSum(computerTotal)}`;
//     console.log(`Computer's total ${computerTotal}`);
//   }
// }

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
