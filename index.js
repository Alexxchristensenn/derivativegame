document.addEventListener("DOMContentLoaded", function () {
  const questionDiv = document.getElementById("question");
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

    func = "\\( f(x) = " + f + "\\)"; // Example question
    ans = a; //Answer associated with the funciton
    questionDiv.innerHTML = func;
    MathJax.typesetPromise([questionDiv]);
  }

  function endGame(incorrectAns) {
    document.querySelector(".container").classList.add("hide");
    document.querySelector(".score").classList.add("hide");
    document.querySelector('.end-screen').classList.remove('hide');
    //Not sure how to get you answered: xyz on new line...
    document.getElementById('correct-ans').innerHTML = 'The correct answer was: ' + ans + '<br><br>You answered: '+incorrectAns;
    document.getElementById('final-score').textContent = 'Final score: ' + score;
  }

  document.getElementById('play-again').addEventListener('click', function(){
    document.querySelector('.end-screen').classList.add('hide');
    //document.getElementById('start-screen').style.display = 'block';

    newFunc();
    inputLatex.value = "";
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    document.querySelector(".container").classList.remove("hide");
    document.querySelector(".score").classList.remove("hide");
  });

  let number = randomNum();
  let keyValuePair = funcMap.get(number.toString());
  let f = keyValuePair.f;
  let a = keyValuePair.a;

  let func = "\\( f(x) = " + f + "\\)"; // Example question
  let ans = a; //Answer associated with the funciton
  questionDiv.innerHTML = func;
  MathJax.typesetPromise([questionDiv]);

  document.getElementById("start-btn").addEventListener("click", function () {
    newFunc();
    inputLatex.value = "";
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    document.getElementById("start-screen").style.display = "none";
    document.querySelector(".container").classList.remove("hide");
    document.querySelector(".score").classList.remove("hide");
  });

  submitBtn.addEventListener("click", function () {
    const userInput = inputLatex.value;
    if (true) {
      //errorMsg.classList.add("hide");
      //alert("Submitted: " + userInput);
      // Assuming further validation or comparison logic here
      if (inputLatex.value == ans) {
        //alert("yayyy u got it right ya genius");
        newFunc();
        inputLatex.value = "";
        score = score + 1;
        scoreBox.innerHTML = "Score: " + score;
      } else {
        endGame(userInput);
      }
    } else {
      errorMsg.textContent = "Please enter a valid derivative.";
      errorMsg.classList.remove("hide");
    }
  });

  //Clicks submit when Enter is pressed
  inputLatex.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      submitBtn.click();
    }
  });
});
