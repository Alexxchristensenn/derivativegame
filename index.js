/*import * as math from 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.0.1/math.min.js';*/

document.addEventListener("DOMContentLoaded", function () {
  const question = document.getElementById("question");
  const inputLatex = document.getElementById("input-latex");
  const submitBtn = document.getElementById("submit-btn");
  const errorMsg = document.getElementById("error-msg");
  const scoreBox = document.getElementById("score");

  let score = 0;

  //Try storing function/derivative pairs in a giant hash map!

  //Hash map might actually be poor because how can you account for
  //all the different possible ways of writing a?
  const funcMap = new Map();
  funcMap.set("1", { f: "2x^2", a: "4x" });
  funcMap.set("2", { f: "3x+1", a: "3" });
  funcMap.set("3", { f: "5x^3", a: "15x^2" });
  funcMap.set("4", { f: "e^x", a: "e^x" });
  funcMap.set("5", { f: "sin(x)", a: "cos(x)" });
  funcMap.set("6", { f: "ln(x)", a: "1/x" });
  funcMap.set("7", { f: "cos(x)", a: "-sin(x)" });
  funcMap.set("8", { f: "10x^4", a: "40x^3" });
  funcMap.set("9", { f: "10874", a: "0" });
  funcMap.set("10", { f: "12x^2-8x+2", a: "24x-8" });

  function randomNum() {
    return Math.ceil(Math.random() * funcMap.size);
  }

  function newFunc() {
    let number = randomNum();
    let keyValuePair = funcMap.get(number.toString());
    let f = keyValuePair.f;
    let a = keyValuePair.a;

    //func = "\\( f(x) = " + f + "\\)"; // Example question
    func = "f(x)=" + f;
    ans = a; //Answer associated with the funciton
    question.innerHTML = func;
    MQ.StaticMath(question);
  }

  function endGame(incorrectAns) {
    document.querySelector(".container").classList.add("hide");
    document.querySelector(".score").classList.add("hide");
    document.querySelector(".end-screen").classList.remove("hide");
    document.getElementById("correct-ans").innerHTML =
      "The correct answer was: " +
      ans +
      "<br><br>You answered: " +
      incorrectAns;
    document.getElementById("final-score").textContent =
      "Final score: " + score;
  }

  //Functionality for play again button
  document.getElementById("play-again").addEventListener("click", function () {
    document.querySelector(".end-screen").classList.add("hide");
    //document.getElementById('start-screen').style.display = 'block';

    newFunc();
    answerMathField.latex("");
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    document.querySelector(".container").classList.remove("hide");
    document.querySelector(".score").classList.remove("hide");
  });

  //Functionality for Return to Home button
  document.getElementById("return-home").addEventListener("click", function () {
    document.querySelector(".end-screen").classList.add("hide");
    document.querySelector(".start-screen").classList.remove("hide");
  });

  let number = randomNum();
  let keyValuePair = funcMap.get(number.toString());
  let f = keyValuePair.f;
  let a = keyValuePair.a;

  //let func = "\\( f(x) = " + f + "\\)"; // Example question
  let func = "f(x)=" + f;
  let ans = a; //Answer associated with the funciton
  question.innerHTML = func;
  MQ.StaticMath(question);

  var answerMathField = MQ.MathField(inputLatex, {
    handlers: {
      edit: function () {
        var enteredMath = answerMathField.latex();
      },
    },
  });

  function fixLatex(expr) {
    const regex = /\\|left|right|frac/g;
    const fracRegex = /\}\{/g;
    const leftParenRegex = /\{/g;
    const rightParenRegex = /\}/g;

    let toReturn = expr.replace(fracRegex, ")/(");
    toReturn = toReturn.replace(leftParenRegex, "(");
    toReturn = toReturn.replace(rightParenRegex, ")");
    toReturn = toReturn.replace(regex, "");
    return toReturn;
  }

  function isEquivalent(math1, math2) {
    try {
      return (
        math.simplify(math1).toString() === math.simplify(math2).toString()
      );
    } catch (error) {
      return false;
    }
  }

  document.getElementById("start-btn").addEventListener("click", function () {
    newFunc();
    answerMathField.latex("");
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    document.querySelector(".start-screen").classList.add("hide");
    document.querySelector(".container").classList.remove("hide");
    document.querySelector(".score").classList.remove("hide");
  });

  submitBtn.addEventListener("click", function () {
    const userInput = fixLatex(answerMathField.latex());
    console.log("User input is " + userInput);

    /*if(userInput===math.derivative(ans)){
      newFunc();
      answerMathField.latex('');
      score = score + 1;
      scoreBox.innerHTML = "Score: " + score;
    } else {
      endGame(userInput);
    }*/

    if (isEquivalent(userInput, ans)) {
      newFunc();
      answerMathField.latex("");
      score = score + 1;
      scoreBox.innerHTML = "Score: " + score;
    } else {
      endGame(userInput);
    }
  });

  //Clicks submit when Enter is pressed
  inputLatex.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      submitBtn.click();
    }
  });
});
