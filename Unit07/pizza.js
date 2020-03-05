const pizza = {
  crust: "thin",
  size: "small",
  topping: ["pepperoni"],
  readOrder: function() {
    console.log("Here to read your order, dude!");
    sayTopping();
  },
  sayList: function() {
    console.log("List all ready to go!");
  }
};
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
  toppingAdder(ancho, "anchovies");
});

function sayTopping() {
  console.log(pizza.topping);
//   console.log(typeof pizza.topping);
//   console.log(pizza.topping.includes("sausage"));
}

//Buttons
document
  .querySelector("#readOrder")
  .addEventListener("click", () => pizza.readOrder());
document
  .querySelector("#shopList")
  .addEventListener("click", () => sayTopping());

phraseArray = [
  "K, so you got a ",
  "Right, so it's a ",
  "Sure thing, dude. We gotta ",
  "Right, ya gotta "
];

const phraser = phraseArray[Math.floor(Math.random() * phraseArray.length)];
