// This is to create a basic fortune teller text.

//Random number generator with max, min fields
let numberGen = function(max, min) {
  let number = Math.floor(Math.random() * (max - min)) + min;
  return number;
};

//Switch to get month name
function getMonth() {
  let givenNum = numberGen(13, 1);
  console.log(givenNum);
  switch (givenNum) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    default:
      return "December";
  }
}
//Additional variation to the defaul switch option of the fortune text
var ObjectArray = [
  "a cleaver.",
  "a beaver.",
  "a speed boat.",
  "an enema kit.",
  'three crazed chinchillas.',
  "your mother-in-law's chest hair tweezers."
];

const painObject = ObjectArray[Math.floor(Math.random() * ObjectArray.length)];

//Switch to provide fortune text
function fortunePick() {
  let fortuneNum = numberGen(10, 1);
  switch (fortuneNum) {
    case 1:
      return "all men will fall before you.";
    case 2:
      return "your vices will finally come in handy.";
    case 3:
      return "an audit of your finances will reveal some discrepancies in your significant other's spending account.";
    case 4:
      return "beware talking rabbits, silk top hats, and following butterflies.";
    case 5:
      return "you will get up.";
    case 6:
      return "you will travel to a magical, far-away land. Cleveland.";
    default:
      return `you will have to get ${numberGen(37,3)} stitches from an unfortunate accident with ${painObject}`;
  }
}

//Definitions to build fortune string
var month = getMonth();
let day = numberGen(31, 1);
let fortune = fortunePick();
let fortuneGen = document.querySelector("#reveal");
let fortuneText = document.querySelector("#fortune1");

//Add click event to reveal fortune text, and call completed string
function revealFortune() {
  fortuneGen.addEventListener("click", () => {
    fortuneText.innerText = `On ${month} ${day}, ${fortune}`;
  });
}

revealFortune();
