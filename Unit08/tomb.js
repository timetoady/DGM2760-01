const question = {
  stem: "What is the airspeed velocity of an unladend swallow?",
  option1: "22.27 mph",
  option2: "30-40 mph",
  option3: "50-60 mph",
  option4: "What do you mean? An African or European swallow?",
  correct: 2,
  funny: 4,
  display: () => {
    document.querySelector("#stem").textContent = question.stem;
    document.querySelector("#answer1").textContent = question.option1;
    document.querySelector("#answer2").textContent = question.option2;
    document.querySelector("#answer3").textContent = question.option3;
    document.querySelector("#answer4").textContent = question.option4;
  },
  checker: userChoice => {
    if (userChoice === question.correct) {
      let answer = document.querySelector("#feedback");
      answer.textContent = "Winner!";
      answer.setAttribute('id', 'winner');
    } else if (userChoice === question.funny) {
      let fun = document.querySelector("#feedback");
      fun.textContent = "Huh? I-- I don't know that. Auuuuuuuugh!";
      fun.setAttribute('id', 'funny');
    } else {
        let tryAgain = document.querySelector("#feedback").textContent = "Please try again.";
        let fallSound = new Audio ('/Unit08/assets/losingHorn.mp3')
        fallSound.play()
    }
  }
};

document
  .querySelector("#answer1")
  .addEventListener("click", () => question.checker(1));
document
  .querySelector("#answer2")
  .addEventListener("click", () => question.checker(2));
document
  .querySelector("#answer3")
  .addEventListener("click", () => question.checker(3));
document
  .querySelector("#answer4")
  .addEventListener("click", () => question.checker(4));

question.display();
