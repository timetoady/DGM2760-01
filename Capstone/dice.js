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
var currentBet = [0];
gameBoard.appendChild(gameStart);


//Last action message window
let statusWindow = document.querySelector('#status');
let update = document.createElement("div");
let updateInfo = document.createElement("p");
statusWindow.appendChild(update);
update.appendChild(updateInfo);

//oddevenWindow ----the Odd, Even, Roll menu. When your turn, you roll. When Computer's turn, you pick odd or even.
let oddevenWindow = document.createElement("div");
let message = document.createElement("h2");
oddevenWindow.setAttribute("class", "messageBox");
oddevenWindow.appendChild(message);
gameBoard.appendChild(oddevenWindow);
gameBoard.appendChild(oddevenWindow);
oddevenWindow.style.display = "none";

//area where images of dice will be displayed
let showDice = document.createElement('div');
let firstDie = document.createElement('img');
let secondDie = document.createElement('img');
gameBoard.appendChild(showDice);
showDice.appendChild(firstDie);
showDice.appendChild(secondDie);

function dieImgCall(number){
  switch (number) {
    case 1:
      return "die1.jpg";
    case 2:
      return "die2.jpg";
    case 3:
      return "die3.jpg";
    case 4:
      return "die4.jpg";
    case 5:
      return "die5.jpg";
    case 6:
      return "die6.jpg";
} 
}
//Sounds 
let snakeHiss = new Audio ('/Capstone/assets/snakehiss1.mp3')
let rollSound = new Audio ('/Capstone/assets/diceroll1.mp3')



//End turn and Continue buttons to officialy switch turns
let endTurn = document.createElement("button");
endTurn.textContent = "End Turn";
endTurn.style.display = "none";
endTurn.addEventListener("click", () => {
  endTurn.style.display = "none";
  yourRoll.style.display = "none";
  updateInfo.textContent = "Please select your bet.";
  updateTotals();
  setTimeout(turnMessage(), 2000);
  setTimeout(turnMessage(), 2000);
  turn++;
  game();
});
let contButton = document.createElement("button");
contButton.textContent = "Continue";
contButton.addEventListener("click", () => {
  contButton.style.display = "none";
  updateInfo.textContent = "Press Continue to continue the game.";
  updateTotals();
  setTimeout(turnMessage(), 2000);
  setTimeout(turnMessage(), 2000);
  turn++;
  game();
});
oddevenWindow.appendChild(contButton);
contButton.style.display = "none";

function goAgain(user) {
  if (user === "player"){
    yourTurn();
  }
  else {computerTurn()}
}

//Running totals to display in the upper right
let runningTotals = document.createElement("div");
runningTotals.setAttribute("class", "totals");
let totalTitle = document.createElement('h2');
totalTitle.textContent = "Totals"
let displayPlayerTotal = document.createElement("p");
let displayCompTotal = document.createElement("p");
displayPlayerTotal.textContent = `Player: ${arrSum(playerTotal)}`;
displayCompTotal.textContent = `Computer: ${arrSum(computerTotal)}`;
gameBoard.appendChild(runningTotals);
runningTotals.appendChild(totalTitle);
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
  console.log(
    `yourRoll says the bet is ${arrSum(currentBet)} and currentBet is ${currentBet}.`
    );
  playerRoll(currentBet);
});



//Button to start game
gameStart.addEventListener("click", () => {
  console.log("This is the JSON data:" + theData);
  game();
});

/*-- Game functions --*/

//main game function, victory condition
function game() {
  console.log(
    `End of turn. Player total is: ${arrSum(
      playerTotal
    )}. Computer's total is: ${arrSum(computerTotal)}.`
  );
  
  if (arrSum(playerTotal) < 100 && arrSum(computerTotal) < 100) {
    if (isEven(turn) === false) {
      console.log(`Turn ${turn}. Player's turn.`);
      yourTurn();
    } else {
      console.log(`Turn ${turn}. Computer's turn.`);
      computerTurn();
    }
  } else if (arrSum(playerTotal) > 100 && arrSum(computerTotal) > 100) {
    if (arrSum(playerTotal) > arrSum(computerTotal)) {
      updateInfo.textContent = "YOU WIN!";
      message.textContent = "Game over!";
      console.log("Player has won. All is right.");
      oddevenWindow.remove();
    } else {
      updateInfo.textContent = "Computer wins!";
      message.textContent = "Game over!";
      console.log("Game over. Computer wins.");
      oddevenWindow.remove();
    }
  } else if (arrSum(playerTotal) > 100) {
    updateInfo.textContent = "YOU WIN!";
    message.textContent = "Game over!";
    console.log("Player has won. All is right.");
    oddevenWindow.remove();
  } else if (arrSum(computerTotal) > 100) {
    updateInfo.textContent = "Computer wins!";
    message.textContent = "Game over!";
    console.log("Game over. Computer wins.");
    oddevenWindow.remove();
  }
}

//youTurn function governs the player's turn, ie.e what happens on odd numbered turns.
function yourTurn() {
  if (turn === 1) {
    gameStart.remove();
    computerBet = oddEven();
    message.textContent = `You go first! I bet ${computerBet}.`;
    console.log(`yourTurn says bet is ${computerBet}.`);
    valueSplicer(computerBet);
    oddevenWindow.style.display = "block";
    runningTotals.style.display = "block";
    yourRoll.style.display = "block";
  } else {
    computerBet = oddEven();
    message.textContent = `Your turn. I bet ${computerBet}.`;
    valueSplicer(computerBet);
    console.log(`yourTurn says bet is ${computerBet}.`);
    evenBet.style.display = "none";
    oddBet.style.display = "none";
    yourRoll.style.display = "block";
  }
}

//Function that edits the currentBet so other functions can know if its even or odd
function valueSplicer(bet) {
  if (bet === "even") {
    currentBet.splice(0, 1, 2);
    console.log(bet);
    console.log(currentBet);
    console.log(
      `valueSplicer says bet is ${bet} and current bet is ${currentBet}.`
    );
  } else {
    currentBet.splice(0, 1, 1);
    console.log(bet);
    console.log(currentBet);
    console.log(
      `valueSplicer says bet is ${bet} and current bet is ${currentBet}.`
    );
  }
}

function playerRoll(computerBet) {
  if (arrSum(computerBet) === 1) {
    bet = "odd";
  } else {
    bet = "even";
  }
  console.log(`Player roll says bet is ${bet}.`);
  thisRoll = rollDice("player", bet);
  die1 = thisRoll[0];
  die2 = thisRoll[1];
  rollSum = thisRoll[2];
  updateInfo.textContent = `Your roll is ${die1} and ${die2}. That's a total of ${rollSum} points.`;
  yourRoll.style.display = "none";
  endTurn.style.display = "block";
}

//rollDice ----Dice roll rules called by roll button or computer function.
function rollDice(user, bet) {
  rollSound.play();
  let die1 = numberGen(7, 1);
  let die2 = numberGen(7, 1);
  let rollSum = die1 + die2;
  animate({
    duration: 900,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      if (progress === 1) {
        firstDie.src = `/Capstone/assets/${dieImgCall(die1)}`;
        secondDie.src = `/Capstone/assets/${dieImgCall(die2)}`;
      } else {
        firstDie.src = `/Capstone/assets/die${numberGen(7,1)}.jpg`;
        secondDie.src = `/Capstone/assets/die${numberGen(7,1)}.jpg`;}
    }
  })

  //here we call json data to provide image
      firstDie.src = `/Capstone/assets/${dieImgCall(die1)}`;
      secondDie.src = `/Capstone/assets/${dieImgCall(die2)}`;
  // die1 = 1;
  // die2 = 1;
  if (die1 === 1 && die2 === 1 && user == "player") {
    endTurn.style.display = "none";
    oddBet.style.display = "none";
    evenBet.style.display = "none";
    updateInfo.textContent = `${user.charAt(0).toUpperCase() +
      user.slice(
        1
      )}'s roll is ${die1} and ${die2}. That's a total of ${rollSum} points.`;
      computerBet = oddEven();
      message.textContent = `You rolled snake eyes, so your turn again. I bet ${computerBet}.`;
      snakeHiss.play()
      addtoTotal("player", 2)
      evenBet.style.display = "none";
      oddBet.style.display = "none";
      yourRoll.style.display = "block";
  } else if (die1 === 1 && die2 === 1 && user == "computer") {
    message.textContent = `Rolled snake eyes, baby. I go again.`;
    updateInfo.textContent = `${user.charAt(0).toUpperCase() +
      user.slice(
        1
      )}'s roll is ${die1} and ${die2}. That's a total of ${rollSum} points.`;
    window.setTimeout(evenBet.style.display = "none", 2000);
    contButton.style.display = "none";
    oddBet.style.display = "none";
    evenBet.style.display = "none";
    message.textContent = `Rolled snake eyes, so my turn again! Choose your bet.`;
    addtoTotal("player", 2);
    evenBet.style.display = "block";
    oddBet.style.display = "block";
  } else if (user === "player") {
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
  evenBet.style.display = "block";
  oddBet.style.display = "block";
}

function turnMessage() {
  if (isEven(turn) === false) {
    message.textContent = "YOUR TURN";
  } else {
    message.textContent = "COMPUTER'S TURN", 2000
  }
}

function addtoTotal(user, amount) {
  if (user === "player") {
    playerTotal.push(amount);
  } else {
    computerTotal.push(amount);
  }
  updateLog();
  updateTotals();
}

function updateTotals() {
  displayPlayerTotal.textContent = `Player: ${arrSum(playerTotal)}`;
  displayCompTotal.textContent = `Computer: ${arrSum(computerTotal)}`;
}

function updateLog() {
  console.log(`The computer's scores are ${computerTotal}`);
  console.log(`The players's scores are ${playerTotal}`);
}

function checkTotal(user) {
  if (user > 100) return true;
}

//animation for dice

function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction)

    draw(progress);  // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

function draw(progress) {
  
}


//Possible ideas: have it edit a text file to keep track of its global wins and losses?
//Have serious mode where it admits defeat if you beat it three times in a row?
