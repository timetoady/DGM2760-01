let message;

phraseArray = [
  "K, so you got a ",
  "Right, so it's a ",
  "Sure thing, dude. We gotta ",
  "Right, ya gotta "
];

const pizza = {
  crust: "thin",
  size: "small",
  topping: ["pepperoni"],
  readOrder: function() {
    const phraser = phraseArray[Math.floor(Math.random() * phraseArray.length)];
    message = `${phraser} ${pizza.size} pizza with ${pizza.crust} crust and ${pizza.topping.toString().replace(/,/g, " 'n ")}... ${theWorks()}`;
    let donnie = document.querySelector(".donnie");
    donnie.textContent = message;
  },
  sayList: () => {
    let flour = 1;
    let cheese = 1;
    let pounds = 1;
    if (pizza.crust === 'thick') flour *= 2;
    if (pizza.crust === 'totally tubular') flour *= 5;
    if (pizza.size === 'small') {flour *= 1; cheese *= 1;} 
    if (pizza.size === 'large') {flour *= 2; cheese += 3; pounds *=2}
    if (pizza.size === 'one shell of a') {
      flour *= 5 
      cheese += 10;
      pounds *=4}
    message = `K, dude, with that, looks like ya gotta buy ${flour} cups flour, ${cheese} cups of cheese, and ${pounds} pounds each 'a ${pizza.topping.toString().replace(/,/g, " 'n ")}.`
    document.querySelector(".donnie").textContent = message;
  }
}

//Crust selector
document
  .querySelector("#thin")
  .addEventListener("click", () => (pizza.crust = "thin"));
document
  .querySelector("#thick")
  .addEventListener("click", () => (pizza.crust = "thick"));
document
  .querySelector("#tubular")
  .addEventListener("click", () => (pizza.crust = "totally tubular"));

//Sizes selector
document
  .querySelector("#small")
  .addEventListener("click", () => (pizza.size = "small"));
document
  .querySelector("#large")
  .addEventListener("click", () => (pizza.size = "large"));
document
  .querySelector("#shell")
  .addEventListener("click", () => (pizza.size = "one shell of a"));

//Toppings add and remove
function toppingAdder(toppingID, toppingName) {
  if (
    toppingID.checked == true &&
    pizza.topping.includes(toppingName) == false
  ) {
    pizza.topping.push(toppingName);
  } else if (
    toppingID.checked == false &&
    pizza.topping.includes(toppingName) == true
  ) {
    toppingRemover(toppingName);
  }
}

function toppingRemover(topp) {
  const isTopping = element => element == topp;
  let top = pizza.topping.findIndex(isTopping);
  console.log(top);
  pizza.topping.splice(top, 1);
}

//Topping listeners
let pepp = document.querySelector("#pepperoni");
pepp.addEventListener("click", () => {
  toppingAdder(pepp, "pepperoni");
});

let saus = document.querySelector("#sausage");
saus.addEventListener("click", () => {
  toppingAdder(saus, "sausage");
});

let marsh = document.querySelector("#marshmellow");
marsh.addEventListener("click", () => {
  toppingAdder(marsh, "marshmellow");
});

let ancho = document.querySelector("#anchovies");
ancho.addEventListener("click", () => {
  toppingAdder(ancho, "anchovies (blech)");
});

function sayTopping() {
  console.log(pizza.topping);
  //   console.log(typeof pizza.topping);
  //   console.log(pizza.topping.includes("sausage"));
}

//Buttons
document.querySelector("#readOrder").addEventListener("click", pizza.readOrder);
document.querySelector("#shopList").addEventListener("click", pizza.sayList);

//Fun stuff

function theWorks() {
  if (pepp.checked == true && saus.checked == true && marsh.checked == true && ancho.checked == true && pizza.crust == "totally tubular" && pizza.size == "one shell of a") {
    return "Looks like the Works, dude!"
  } else {
    return "that it?"
  }
}
