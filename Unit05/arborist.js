//Array with 4 trees

const trees = ["oak", "ash", "pine", "Maple"];
const errorElement = document.querySelector("#errors");
const displayResults = document.querySelector("#displayResults");
let globalClick = 0;

//Fun with error messages

let ErrorArray = [
  "There isn't anything on the list, but if there were, you can be assured it would all be in lower case.",
  "that didn't do anything, but i've made this messsage lower case to help make you feel better.",
  "Consider the empty space to now be thoroughly lower-cased."
];

const errorMessage = ErrorArray[Math.floor(Math.random() * ErrorArray.length)];

//To display the list of trees

const listTrees = () => {
  let treeList = "";
  trees.forEach(tree => {
    treeList += `${tree} <br>`;
  });
  displayResults.innerHTML = `${treeList} <span>${trees.length} elements long</span>`;
};
listTrees();

//Button functions

document.querySelector("#redwoodAdd").onclick = () => {
  trees.push("redwood");
  listTrees();
  if (trees.length > 30) {
    errorElement.textContent =
      "Okay, whoa. That is a lot of trees. You can probably stop now.";
  }
};

document.querySelector("#pearAdd").onclick = () => {
  trees.unshift("Pear");
  listTrees();
  if (trees.length > 30) {
    errorElement.textContent =
      "Okay, whoa. That is a lot of trees. You can probably stop now.";
  }
};

document.querySelector("#remove1st").onclick = () => {
  if (trees.length > 0) {
    trees.shift("");
    listTrees();
  } else {
    errorElement.textContent = "Can't remove first tree, no trees present.";
    globalClick += 1;
    clickCount();
  }
};

document.querySelector("#remove2nd").onclick = () => {
  if (trees.length > 1) {
    trees.splice(1, 1);
    listTrees();
  } else if (trees.length <= 1) {
    errorElement.textContent =
      "Cannot remove second tree, too few trees present.";
    globalClick += 1;
    clickCount();
  }
};

document.querySelector("#removeLast").onclick = () => {
  if (trees.length > 0) {
    trees.pop();
    listTrees();
  } else {
    errorElement.textContent = "Cannot remove last tree, no trees present.";
    globalClick += 1;
    clickCount();
  }
};

document.querySelector("#sortA").onclick = () => {
  trees.sort();
  listTrees();
  if (trees.length == 1) {
    errorElement.textContent =
      "You've just sorted a list with a single element. Excellent work!";
    globalClick += 1;
  } else if (trees.length == 0) {
    errorElement.textContent = "The empty list is now well sorted.";
    globalClick += 1;
    clickCount();
  }
};

document.querySelector("#makeLow").onclick = () => {
  cnt = -1;
  trees.forEach(tree => {
    tree = tree.toLowerCase();
    trees.splice((cnt += 1), 1, tree);
  });
  listTrees();
  if (trees.length == 0) {
    errorElement.textContent = errorMessage;
    globalClick += 1;
    clickCount();
  }
};




function clickCount() {
  if (globalClick > 9 && globalClick < 19) {
    errorElement.textContent =
      "Wow, you're a pretty persistant clicker, aren't you?";
  } else if (globalClick >= 19 && globalClick < 30) {
    errorElement.textContent = "Jeez, dude, give it a rest already.";
  } else if (globalClick >= 30 && globalClick < 100) {
    errorElement.textContent = `You have now clicked for error messages ${globalClick} times.`;
  } else if (globalClick >= 100) {
    errorElement.innerHTML = `Congratulations! You've now clicked to get error messages 100 times! I'll put a a counter below so you can just keep clicking and watching the number get bigger to your heart's content. <br><br> Clicks: ${globalClick}`;
  }
};


