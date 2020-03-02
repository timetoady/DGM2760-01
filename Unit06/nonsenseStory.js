function tellStory() {
  // Constructing the arrays from the text area inputs
  let nounArray = document
    .querySelector("#nouns")
    .value.toLowerCase()
    .replace(/,/g, " ")
    .split(/\s+/);
  nounArray[5] = nounArray[5] + "s";

  let verbArray = document
    .querySelector("#verbs")
    .value.trim()
    .toLowerCase()
    .replace(/,/g, " ")
    .split(/\s+/);

  verbArray[0] = verbArray[0] + "s";

  let adjArray = document
    .querySelector("#adjectives")
    .value.trim()
    .toLowerCase()
    .replace(/,/g, " ")
    .split(/\s+/);

  //Story string and assignment to p area
  const myStory = `There is an anchient prophesy, passed down out of legend. When a ${adjArray[0]} ${nounArray[0]} ${verbArray[0]} into the scene, ${nounArray[1]} shakes, ${nounArray[2]} trembles, and even a ${nounArray[3]} will ${verbArray[1]}. Such is the life for a ${adjArray[1]} ${nounArray[4]} who ${verbArray[0]}. And it will mean the doom of many ${adjArray[2]} ${nounArray[5]} who live in a ${nounArray[6]}.`;
  let storyBox = document.querySelector("#theStory");
  storyBox.textContent = myStory;

  //Simple if statment to check the length of the arrays is correct, and error if not
  if (nounArray.length < 7) {
    storyBox.textContent = "Please put seven nouns in the nouns box.";
  } else if (adjArray.length < 3) {
    storyBox.textContent = "Please put three adjectives in the adjectives box.";
  } else if (verbArray.length < 2) {
    storyBox.textContent = "Please put two verbs in the verbs box.";
  }
}
