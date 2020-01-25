//Company and slogan select
document.querySelector("#company").innerText = "Guessing Game";
document.querySelector("#slogan").innerText = "Better guess right!";

//Definitions, for random selection, guesses, and created elements like results and award
let max = 16;
let min = 1;
const number = Math.floor(Math.random() * (max - min)) + min;
let guessed = false;
let totalGuesses = 0;
let gamerGuess = 0;
let results = document.createElement("p");
let showGuess = document.createElement("p");
let award = document.createElement("img");
feedback.appendChild(results);
attempts.appendChild(showGuess);
prize.appendChild(award);
let buttonStop = document.querySelector("#thebutton");

//function to do guessing game
function evalGuess() {
  gamerGuess = document.querySelector("#guess").value;
  const feedback = document.querySelector("#feedback");
  console.log(gamerGuess);
  console.log(`The correct number is ${number}`);
  if (gamerGuess == number) {
    totalGuesses++;
    attempts.innerText = totalGuesses;
    switch (totalGuesses) {
      case 1:
        award.src = "/Unit03/assets/FirstPlacemdpi.png";
        award.alt = "First place!";
        results.innerText =
          "Congradulations! You've managed to guess the correct number on the first try. Your exploits will go down in history, and bards will sing songs of your excellence forever. Consider yourself a hero.";
        buttonStop.remove();
        break;
      case 2:
      case 3:
        award.src = "/Unit03/assets/FirstPlacemdpi.png";
        award.alt = "First place!";
        results.innerText = "Correct! You the Champ!";
        buttonStop.remove();
        break;
      case 4:
      case 5:
      case 6:
        award.src = "/Unit03/assets/2ndPlacemdpi.png";
        award.alt = "Second place!";
        results.innerText = "Correct! Well done. Just short of greatness.";
        buttonStop.remove();
        break;
      case 7:
      case 8:
      case 9:
        award.src = "/Unit03/assets/3rdPlacemdpi.png";
        award.alt = "Third place!";
        results.innerText =
          "Correct! But you can do better! Refresh to try again!";
        buttonStop.remove();
        break;
      default:
        award.src = "/Unit03/assets/Participationmdpi.png";
        award.alt = "Participation prize";
        results.innerText =
          "Correct! But you must train harder to become a TRUE guesser! Refresh to try again!";
        buttonStop.remove();
        break;
    }
  } else if (gamerGuess < 1 || gamerGuess > 15) {
    results.innerText = "Please select a number between 1 and 15.";
  } else if (gamerGuess > number) {
    totalGuesses++;
    results.innerText = "Too high! Please try again.";
    attempts.innerText = totalGuesses;
  } else if (gamerGuess < number) {
    totalGuesses++;
    results.innerText = "Too low! Please try again.";
    attempts.innerText = totalGuesses;
  } else {
    console.log("I'm sorry, please try again.");
  }
}
