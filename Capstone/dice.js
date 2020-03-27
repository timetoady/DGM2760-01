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

function arrayRandomPick(array) {
  const pick = array[Math.floor(Math.random() * array.length)];
  return pick;
}

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
let topInfo = document.querySelector("#topInfo");
var allButtons = document.querySelectorAll("button");



//Running totals to display in the upper right
let runningTotals = document.createElement("div");
runningTotals.setAttribute("class", "totals");
let totalTitle = document.createElement("h2");
totalTitle.textContent = "Totals";
let displayPlayerTotal = document.createElement("p");
let displayCompTotal = document.createElement("p");
displayPlayerTotal.textContent = `Player: ${arrSum(playerTotal)}`;
displayCompTotal.textContent = `Computer: ${arrSum(computerTotal)}`;
gameBoard.appendChild(runningTotals);
runningTotals.appendChild(totalTitle);
runningTotals.appendChild(displayPlayerTotal);
runningTotals.appendChild(displayCompTotal);

//oddevenWindow ----the Odd, Even, Roll menu. When your turn, you roll. When Computer's turn, you pick odd or even.
let oddevenWindow = document.createElement("div");
let message = document.createElement("h2");
oddevenWindow.setAttribute("class", "messageBox");
oddevenWindow.appendChild(message);
gameBoard.appendChild(oddevenWindow);
gameBoard.appendChild(oddevenWindow);
oddevenWindow.style.display = "none";

//area where images of dice will be displayed
let showDice = document.createElement("div");
showDice.setAttribute("class", "diceStatus");
let firstDie = document.createElement("img");
let secondDie = document.createElement("img");
gameBoard.appendChild(showDice);
showDice.appendChild(firstDie);
showDice.appendChild(secondDie);

//Last action message window
let statusWindow = document.querySelector("#status");
let update = document.createElement("div");
let updateInfo = document.createElement("p");
updateInfo.textContent = "Ready to play!"
showDice.appendChild(update);
update.appendChild(updateInfo);


function dieImgCall(number) {
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
let snakeHiss = new Audio("/Capstone/assets/snakehiss1.mp3");
let rollSound = new Audio("/Capstone/assets/diceroll1.mp3");

//End turn and Continue buttons to officialy switch turns
let endTurn = document.createElement("button");
endTurn.textContent = "End Turn";
endTurn.style.display = "none";
endTurn.addEventListener("click", () => {
  endTurn.style.display = "none";
  yourRoll.style.display = "none";
  updateInfo.textContent = "Please select your bet.";
  updateTotals();
  turn++;
  game();
});
let contButton = document.createElement("button");
contButton.textContent = "Continue";
contButton.addEventListener("click", () => {
  contButton.style.display = "none";
  updateInfo.textContent = "Player's turn to roll.";
  updateTotals();
  turn++;
  game();
});
oddevenWindow.appendChild(contButton);
contButton.style.display = "none";

function goAgain(user) {
  if (user === "player") {
    yourTurn();
  } else {
    computerTurn();
  }
}



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
    `yourRoll says the bet is ${arrSum(
      currentBet
    )} and currentBet is ${currentBet}.`
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
  } else if (arrSum(playerTotal) >= 100 && arrSum(computerTotal) >= 100) {
    if (arrSum(playerTotal) > arrSum(computerTotal)) {
      statusWindow.appendChild(updateInfo);
      updateInfo.textContent = "YOU WIN!";
      console.log("Player has won. All is right.");
      lastWord("player");
      endGame();
      
    } else {
      statusWindow.appendChild(updateInfo);
      updateInfo.textContent = "Computer wins!";
      console.log("Game over. Computer wins.");
      lastWord("computer");
      endGame();
      
    }
  } else if (arrSum(playerTotal) >= 100) {
    statusWindow.appendChild(updateInfo);
    updateInfo.textContent = "YOU WIN!";
    console.log("Player has won. All is right.");
    endGame();
    lastWord("player");
  } else if (arrSum(computerTotal) >= 100) {
    statusWindow.appendChild(updateInfo);
    updateInfo.textContent = "Computer wins!";
    console.log("Game over. Computer wins.");
    lastWord("computer");
    endGame();
    
  }
}

//Helper function to remove windows
function endGame() {
  oddevenWindow.remove();
  showDice.remove();
  let gameBorder = document.querySelector(".gameBorder");
  gameBorder.setAttribute("class", ".endBoard");
  let replay = document.createElement("button");
  replay.textContent = "Play again?";
  replay.addEventListener("click", () => {
    location.reload();
  });
  gameBorder.appendChild(replay);
}

//youTurn function governs the player's turn, i.e. what happens on odd numbered turns.
function yourTurn() {
  if (turn === 1) {
    gameStart.remove();
    challenge.style.display = "none";
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

//Helper function that interprets the array currentBet to get even or odd
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
  // die1 = 1;
  // die2 = 1;
  if (die1 === 1 && die2 === 1 && user == "player") {
    endTurn.style.display = "none";
    oddBet.style.display = "none";
    evenBet.style.display = "none";
    timedAnimate(user, die1, die2, rollSum, snake(user));
    message.textContent = `You rolled snake eyes, so your turn again. I bet ${computerBet}.`;
    computerBet = oddEven();
    snakeHiss.play();
    addtoTotal("player", 2);
    evenBet.style.display = "none";
    oddBet.style.display = "none";
    yourRoll.style.display = "block";
  } else if (die1 === 1 && die2 === 1 && user == "computer") {
    timedAnimate(user, die1, die2, rollSum, snake(user));
    message.textContent = `Rolled snake eyes, baby. I go again.`;
    snakeHiss.play();
    // updateBox(user, die1, die2, rollSum);
    window.setTimeout((evenBet.style.display = "none"), 2000);
    contButton.style.display = "none";
    oddBet.style.display = "none";
    evenBet.style.display = "none";
    addtoTotal("player", 2);
    evenBet.style.display = "block";
    oddBet.style.display = "block";
  } else if (user === "player") {
    timedAnimate(user, die1, die2, rollSum, snark(user, rollSum));
    addtoTotal(user, rollSum);
    betCheck("computer", bet, rollSum);
    // updateTotals();
    // updateBox(user, die1, die2, rollSum);
    return [die1, die2, rollSum];
  } else if (user === "computer") {
    timedAnimate(user, die1, die2, rollSum, snark(user, rollSum));
    addtoTotal(user, rollSum);
    betCheck("player", bet, rollSum);
    // updateTotals();
    // updateBox(user, die1, die2, rollSum);
    return [die1, die2, rollSum];
  }
}

//Checks if you or computer bet correctly, and awards points accordingly
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
    // updateTotals();
  } else if (
    (checkRoll === true && bet === "even" && better === "player") ||
    (checkRoll === false && bet === "odd" && better === "player")
  ) {
    console.log(`Player wins the bet.`);
    addtoTotal("player", 5);
    message.textContent = "You won the bet this time. 5 points.";
    // updateTotals();
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

//Some basic helper functions, like adding to the correct user's total, and updating other visable info/the log
function addtoTotal(user, amount) {
  if (user === "player") {
    playerTotal.push(amount);
  } else {
    computerTotal.push(amount);
  }
}

function updateTotals() {
  displayPlayerTotal.textContent = `Player: ${arrSum(playerTotal)}`;
  displayCompTotal.textContent = `Computer: ${arrSum(computerTotal)}`;
}

function updateBox(user, die1, die2, rollSum) {
  updateInfo.textContent = `${user.charAt(0).toUpperCase() +
    user.slice(
      1
    )}'s roll is ${die1} and ${die2}. That's a total of ${rollSum} points.`;
}

function updateLog() {
  console.log(`The computer's scores are ${computerTotal}`);
  console.log(`The players's scores are ${playerTotal}`);
}

function checkTotal(user) {
  if (user > 100) return true;
}

//General animation function to call

function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}



//Function that takes dice and user and animated roll and display of info
function timedAnimate(user, die1, die2, rollSum, compMessage) {
  animate({
    duration: 900,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      if (progress === 1) {
        
        firstDie.src = `/Capstone/assets/${dieImgCall(die1)}`;
        secondDie.src = `/Capstone/assets/${dieImgCall(die2)}`;
        updateBox(user, die1, die2, rollSum);
        message.style.display = "block";
        topInfo.textContent = compMessage;
        updateLog();
        updateTotals();
        if (user === "computer") {
          contButton.style.display = "block";
        } else {
          endTurn.style.display = "block";
        }

        
      } else {
        firstDie.src = `/Capstone/assets/die${numberGen(7, 1)}.jpg`;
        secondDie.src = `/Capstone/assets/die${numberGen(7, 1)}.jpg`;
        updateInfo.textContent = "Rolling...";
        message.style.display = "none";
        contButton.style.display = "none";
        endTurn.style.display = "none";
        
        
        
        
        
      }
    }
  });
}

//Arrays for comments based on rolls

let goodRoll = [
  "Lucky this time. Won't happen next time.",
  "Well, that was better than you usually do.",
  "Not bad. But not great.",
  "I've seen better.",
  "A normal roll. Nothing to see here.",
  "*YAWN* Is it my turn yet?",
  "Wowza. What barn burner. *sarcasm intensifies*",
  "Normal roll. Move along, nothing to see here.",
  "K, nothing to get excited about, friend. It's just a roll.",
  "Its a roll. Whoop-de-doo.",
  "Huh, what? You still haven't finished your turn? I don't have all day, senior.",
  "Ho hum. It is what it is.",
  "Well, that was fine, I guess. For you."
];

let greatRoll = [
  "Cheat. You are a cheat.",
  "Oh, and I supposed you want me to beleive you rolled that legitimately?",
  "Good for you. Not.",
  "Well, la di freakin' da. You're still ugly.",
  "I suppose you feel good about yourself. It won't last.",
  "Am I supposed to be impressed? This is a game of chance, dude.",
  "Son of a--",
  "Congrats. What, do you want a party or something?",
  "Stop that, will you?!",
  "Oh, really? Come on, give me a break...",
  "Well, ain't you a lucky, lucky, sucky duck."
];

let badRoll = [
  "Ha! Loser.",
  "Well, that was pathetic. My turn.",
  "I'm sorry, do you need some help? I can spot you a point if you ask nicely enough.",
  "Ain't gonna win that way, chum.",
  "Welp, THAT didn't work.",
  "Ha! Sucker.",
  "Wow. That was terrible. Like, really.",
  "Um, you do know you want HIGH roll, don't you?",
  "No problem, you'll get the next. Or the one after. Or the... well, it was a good effort, anyway.",
  "Well, that was almost a good roll. Almost. Not really.",
  "*snerk* Good job, good effort...",
  "Missed it by thaaaat much.",
  "Juuuuust a bit outside."
];

let goodCompRoll = [
  "Ha! Eat my dust!",
  "Booyah! Eat it!",
  "I. am. on. a. ROLL!",
  "Can't stop this train, baby.",
  "Ain't nohtin' gonna break-a my stride, Nobody gonna slow me down, oh no...",
  "Hot dog. We rollin' now.",
  "Boom, baby.",
  "You could cook an egg on me, cuz I am HOT!",
  "Mmm mmm. So, SO good.",
  "I like it a lot.",
  "Boom said the lady."
];

let badCompRoll = [
  "What? That can't be right.",
  "Fine. Just you wait.",
  "My hand slipped. Reroll? No?",
  "Hey, me on a bad roll is like you on a great one.",
  "Oh, @#$%! You gotta be kidding me!",
  "Hey kid, don't breath so close to me, you're throwing off my mojo.",
  "Okay, I admit it, that just sucked.",
  "...sigh.",
  "I'm just keeping you in the game, son. Making it a game."
];

let winQuote = [
  "Aww, you thought you could win? That's just cute.",
  "I. Am. The. GREATEST!",
  "Better luck next time, Runner Up.",
  "Well, that turned out exactly as I predicted.",
  "You just got owned. Come back for more?",
  "Well, you know what they say. In this life there are winners, and then there is you.",
  "If I had a body, I'd be breathing on my fingernails and buffing them on my shirt.",
  "Compuer wins. You lose. Computer wins. You lose. Computer wins. You LOOOOOOSE.",
  "I'd like to thank all the little people. Like you.",
  "Second place. First loser."
];

let loseQuote = [
  "WHAT?! NO WAY!",
  "A lucky round, jerk. I bet you can't beat me a second time.",
  "So what? So you won a game. Even a blind pig find an acorn once in a while. Let's see you repeat it.",
  "Fine. So you won. Big deal. It's not like I care.",
  "Oh, COME ON! There's no way I could lose like that!",
  "Fine. You win. That makes it like a few for you and a billion for me.",
  "I'll get you next time, human. Next time.",
  "INCON-- INCONS-- NOT POSSIBLE! How could I lose?!",
  "ARRRRR....! Fine. Fine. You win. There, I said it.",
  "YOU--! THAT--! IT--! ...Oh, fine. FINE. But you're STILL ugly!",
  "NOOOOOOOOOOOOOOO!",
  "Welp, I'm done."
];

let playerSnake = [
  "Yeah, you get to roll again, but I get to bet again. And we both know who's better at what.",
  "Alright, fine, just roll again already.",
  "Lucky roll, hotshot. Better not waste it.",
  "Mmmkay. You get another roll. You do know how this works, right?",
  "And there was great rejoicing. Yay. Now roll again already.",
  "Is that your roll or your IQ? Just roll again already.",
  "Slow clap. Now roll agian.",
  "Don't strain you arm patting yourself on the back. This is a game of chance, you know."
];

let compSnake = [
  "And I'm goin' again, I'm goin' again...",
  "Snake eyes, baby.",
  "Hiss hiss.",
  "S-s-s-s-s-SNAKE EYES!",
  "See the ones, roll again. Gonna roll right over your, friend.",
  "Sweetness. Ready for the next one.",
  "And I did that one left-handed. Watch what happens when I do it with my right."
];

function snark(user, sum) {
  if (user === "player") {
    switch (sum) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return arrayRandomPick(badRoll);
      case 6:
      case 7:
      case 8:
      case 9:
        return arrayRandomPick(goodRoll);
      case 10:
      case 11:
      case 12:
        return arrayRandomPick(greatRoll);
    }
  } else {
    switch (sum) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return arrayRandomPick(badCompRoll);
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        return arrayRandomPick(goodCompRoll);
    }
  }
}

function snake(user) {
  if (user === "player") {
    let words = arrayRandomPick(playerSnake);
    return words;
  } else {
    let words = arrayRandomPick(compSnake);
    return words;
  }
}

function lastWord(winner) {
  if (winner === "player") {
    let words = arrayRandomPick(loseQuote);
    topInfo.textContent = words;
  } else {
    let words = arrayRandomPick(winQuote);
    topInfo.textContent = words;
  }
}

//use switch statment and random function to select statements based on roll sum.

//Possible ideas: have it edit a text file to keep track of its global wins and losses?
//Have serious mode where it admits defeat if you beat it three times in a row?
