import confetti from "https://cdn.skypack.dev/canvas-confetti";
/*import * as math from 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.0.1/math.min.js';*/

document.addEventListener("DOMContentLoaded", function () {
  const question = document.getElementById("question");
  const inputLatex = document.getElementById("input-latex");
  const submitBtn = document.getElementById("submit-btn");
  const errorMsg = document.getElementById("error-msg");
  const scoreBox = document.getElementById("score");
  const timerBar = document.getElementsByClassName("timer-bar")[0];

  let score = 0;
  let timerIntervalId = 0;
  let givenHardFunc = false;

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
  funcMap.set("11", { f: "7x^3", a: "21x^2" });
  funcMap.set("12", { f: "4x^5", a: "20x^4" });
  funcMap.set("13", { f: "x^6", a: "6x^5" });
  funcMap.set("14", { f: "2x^3 + 5x", a: "6x^2 + 5" });
  funcMap.set("15", { f: "3x^4 - 2x^2", a: "12x^3 - 4x" });
  funcMap.set("16", { f: "sqrt(x)", a: "1/(2sqrt(x))" });
  funcMap.set("17", { f: "x^{-2}", a: "-2x^(-3)" });
  funcMap.set("18", { f: "x^{-1}", a: "-x^(-2)" });
  funcMap.set("19", { f: "e^{2x}", a: "2e^(2x)" });
  funcMap.set("20", { f: "2e^x", a: "2e^x" });
  funcMap.set("21", { f: "ln{2x}", a: "1/x" });
  funcMap.set("22", { f: "ln(x^2)", a: "2/x" });
  funcMap.set("23", { f: "tan(x)", a: "sec^2(x)" });
  funcMap.set("24", { f: "cot(x)", a: "-csc^2(x)" });
  funcMap.set("25", { f: "sec(x)", a: "sec(x)tan(x)" });
  funcMap.set("26", { f: "csc(x)", a: "-csc(x)cot(x)" });
  funcMap.set("27", { f: "2x^2 + 3x + 1", a: "4x + 3" });
  funcMap.set("28", { f: "x^4 - 4x^3 + x", a: "4x^3 - 12x^2 + 1" });
  funcMap.set("29", { f: "8x^3 + 3x^2 + 5", a: "24x^2 + 6x" });
  funcMap.set("30", { f: "sin(2x)", a: "2cos(2x)" });
  funcMap.set("31", { f: "cos(3x)", a: "-3sin(3x)" });
  funcMap.set("32", { f: "5x^2 + ln(x)", a: "10x + 1/x" });
  funcMap.set("33", { f: "x^3 - 3x^2 + 2x - 1", a: "3x^2 - 6x + 2" });
  funcMap.set("34", { f: "3x^2 - 5sin(x)", a: "6x - 5cos(x)" });
  funcMap.set("35", { f: "2x - 3cos(x)", a: "2 + 3sin(x)" });
  funcMap.set("36", { f: "5x^4 + 2x^3 - x", a: "20x^3 + 6x^2 - 1" });
  funcMap.set("37", { f: "ln(x) + x^3", a: "1/x + 3x^2" });
  funcMap.set("38", { f: "3x^2 + e^x", a: "6x + e^x" });
  funcMap.set("39", { f: "cos(x) + x^3", a: "-sin(x) + 3x^2" });
  funcMap.set("40", { f: "e^x - x^2", a: "e^x - 2x" });
  funcMap.set("41", { f: "x^3 - 2x + 1", a: "3x^2 - 2" });
  funcMap.set("42", { f: "10x^2 + 4ln(x)", a: "20x + 4/x" });
  //funcMap.set("99", { f: "testingtesting", a: "" }); //TEST

  const hardMap = new Map();

  hardMap.set("1", { f: "x^{1/3}", a: "1/3x^(-2/3)" });
  hardMap.set("2", { f: "e^{3x} + 4x", a: "3e^(3x) + 4" });
  hardMap.set("3", { f: "x^2 * e^x", a: "(x^2)e^x + 2xe^x" });
  hardMap.set("4", { f: "e^{x^2}", a: "2x e^(x^2)" });
  hardMap.set("5", { f: "2x + 3/x", a: "2 - 3/x^2" });
  hardMap.set("6", { f: "x^2 * sin(x)", a: "2xsin(x) + x^2cos(x)" });
  hardMap.set("7", { f: "sin(x) * cos(x)", a: "cos(2x)" });
  hardMap.set("8", { f: "e^{2x} - ln(x)", a: "2e^(2x) - 1/x" });
  hardMap.set("9", { f: "x^2 * ln(x)", a: "2xln(x) + x" });
  hardMap.set("10", { f: "sin(x) * e^x", a: "e^xsin(x) + e^xcos(x)" });
  //hardMap.set("99", { f: "test", a: "" });



  function randomNum() {
    //return 99;
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

  function newHardFunc() {
    givenHardFunc = true;
    timerBar.classList.add("hide");
    let number = Math.ceil(Math.random() * hardMap.size);
    let keyValuePair = hardMap.get(number.toString());
    let f = keyValuePair.f;
    let a = keyValuePair.a;

    //func = "\\( f(x) = " + f + "\\)"; // Example question
    func = "f(x)=" + f;
    ans = a; //Answer associated with the funciton
    question.innerHTML = func;
    MQ.StaticMath(question);
  }

  //Makes the input field flash red for incorrect inputs
  function flashRed(element) {
    element.classList.add("flash-red");
    setTimeout(() => {
      element.classList.remove("flash-red");
    }, 500);
  }

  //Makes the container glash green for a correct answer
  function flashGreen(element) {
    element.classList.add("flash-green");
    setTimeout(() => {
      element.classList.remove("flash-green");
    }, 500);
  }

  function endGame(incorrectAns) {
    givenHardFunc = false;
    document.querySelector(".container").classList.add("hide");
    document.querySelector(".score").classList.add("hide");
    document.querySelector(".end-screen").classList.remove("hide");
    //document.querySelector(".leaderboard").classList.remove("hide");
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
    document.querySelector(".leaderboard").classList.add("hide");
    //document.getElementById('start-screen').style.display = 'block';

    newFunc();
    answerMathField.latex("");
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    document.querySelector(".container").classList.remove("hide");
    document.querySelector(".score").classList.remove("hide");
    startTimer();
  });

  //Functionality for Return to Home button
  document.getElementById("return-home").addEventListener("click", function () {
    document.querySelector(".end-screen").classList.add("hide");
    //document.querySelector(".leaderboard").classList.add("hide");
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
    startTimer();
  });

  function startTimer() {
    timerBar.style.setProperty("--width", 100);
    timerIntervalId = setInterval(() => {
      const computedStyle = getComputedStyle(timerBar);
      const width =
        parseFloat(computedStyle.getPropertyValue("--width")) || 100;
      timerBar.style.setProperty("--width", width - 0.10);
      if (width <= 2.5) {
        outOfTime();
      }
    }, 1);
  }

  function stopTimer() {
    clearInterval(timerIntervalId);
  }

  submitBtn.addEventListener("click", function () {
    const userInput = fixLatex(answerMathField.latex());

    /*if(userInput===math.derivative(ans)){
      newFunc();
      answerMathField.latex('');
      score = score + 1;
      scoreBox.innerHTML = "Score: " + score;
    } else {
      endGame(userInput);
    }*/

    if (isEquivalent(userInput, ans)) {
      flashGreen(inputLatex);
      score = score + 1;
      if (score % 10 == 0) {
        stopTimer();
        answerMathField.latex("");
        scoreBox.innerHTML = "Score: " + score;
        newHardFunc();
        return;
      } else if (givenHardFunc){
        
        confetti();
        timerBar.classList.remove("hide");
        givenHardFunc = false;
      }
      stopTimer();
      answerMathField.latex("");
      scoreBox.innerHTML = "Score: " + score;
      newFunc();
      startTimer();
    } else if (givenHardFunc){
      endGame(userInput);
    } else {
      flashRed(inputLatex);
    }
  });

  function outOfTime() {
    stopTimer();
    const userInput = fixLatex(answerMathField.latex());

    /*if(userInput===math.derivative(ans)){
      newFunc();
      answerMathField.latex('');
      score = score + 1;
      scoreBox.innerHTML = "Score: " + score;
    } else {
      endGame(userInput);
    }*/

    if (isEquivalent(userInput, ans)) {
      flashGreen(inputLatex);
      score = score + 1;
      if (score % 10 == 0) {
        console.log(score % 10);
        confetti();
      }
      newFunc();
      answerMathField.latex("");
      scoreBox.innerHTML = "Score: " + score;
      startTimer();
    } else {
      endGame(userInput);
    }
  }

  //Clicks submit when Enter is pressed
  inputLatex.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      submitBtn.click();
    }
  });
});
