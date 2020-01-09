let yourName = prompt("Please give your first name: ");
var Array1 = [
    'stranger',
    'friend',
    'my dude',
    'good fellow'
]
const noName = Array1[Math.floor(Math.random()*Array1.length)];
function namer() {
  if (yourName !== null && yourName !== "") {
    return yourName;
  } else {
    return noName;
  }
}
document.querySelector("#company").innerText = "Joe's Bed n' Breakfast";
document.querySelector("header > h2").innerText =
  "The Place to Sleep... and Eat Breakfast";
let thedate = new Date();
document.querySelector(
  "#date"
).innerText = `Today's date is ${thedate.toLocaleDateString()}.`;
document.querySelector(
  "#greeting"
).innerText = `This is what I learned, ${namer()}:`;
