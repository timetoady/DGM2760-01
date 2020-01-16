var ClouseauQuotes = [
  '"I thought you said your dog did not bite!"',
  '"Hello? Yes. There is a beautiful woman in my bed, and a dead man in my bath."',
  '"You fool! You have broken my pointing stick! Now I have nothing to point with!"',
  '"With me, suprises are rarely unexpected."',
  '"It is obvious to my trained eye that there is much more going on here than meets the ear."',
  '"I see you are familiar with the falling-down-on-the-floor ploy."'
];

const quote = ClouseauQuotes[Math.floor(Math.random() * ClouseauQuotes.length)];

document.querySelector("#company").innerText = "Inspector Clouseau";
document.querySelector("header > h2").innerText = `${quote}`;

//Window Properties

function displayUpdate() {
  let winWidth = window.innerWidth;
  let winHeight = window.innerHeight;
  let winOffsetX = window.screenX;
  let winOffsetY = window.screenY;
  let winURL = document.URL;
  let windowProps = document.querySelector("#theWindow");
  let windowSize = `The window size is ${winWidth} pixels wide and ${winHeight} pixels tall.`;
  let windOffsets = `The window size is ${winOffsetX} pixels from the left edge and ${winOffsetY} pixels from the top.`;
  let docURL = `The page URL is ${winURL}.`;
  windowProps.innerText = windowSize + "\n" + windOffsets + "\n" + docURL;
}

//Document Properties
let docTitle = document.title;
let docUpdate = document.lastModified;
let docProps = document.querySelector("#theDoc");
docProps.innerText = `Document title is ${docTitle}. \n This document was last updated ${docUpdate}.`

let winWidth = window.innerWidth;

function headerflip() {
    if (winWidth <= 600) {
        
    } 
}




