document.addEventListener("DOMContentLoaded", function() {

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
    funcMap.set("1", {f: "2x^2", a: "4x"});
    funcMap.set("2", {f: "3x+1", a: "3"});
    funcMap.set("3", {f: "5x^3", a: "15x^2"});
    funcMap.set("4", {f: "e^x", a: "e^x"});
    funcMap.set("5", {f: "sin(x)", a: "cos(x)"});
    funcMap.set("6", {f: "ln(x)", a: "1/x"});
    funcMap.set("7", {f: "cos(x)", a: "-sin(x)"});
    funcMap.set("8", {f: "10x^4", a: "40x^3"});
    funcMap.set("9", {f: "10874", a: "0"});
    funcMap.set("10", {f: "12x^2-8x+2", a: "24x-8"});
    
    function randomNum(){
        return Math.ceil(Math.random()*(funcMap.size));
    }

    function newFunc(){
        console.log("entering newfunc!");
        let number  = randomNum();
        console.log("got a random number");
        let keyValuePair = funcMap.get(number.toString());
        console.log("fetched a key value pair");
        let f = keyValuePair.f;
        console.log("f assigned");
        let a = keyValuePair.a;
        console.log("a assigned");

        func = "\\( f(x) = " + f + "\\)"; // Example question
        ans  = a; //Answer associated with the funciton
        questionDiv.innerHTML = func;
        console.log("HTML updated");
        MathJax.typesetPromise([questionDiv]);
        console.log("did some random mathjax shit");
    }

    let number  = randomNum();
    let keyValuePair = funcMap.get(number.toString());
    let f = keyValuePair.f;
    let a = keyValuePair.a;

    let func = "\\( f(x) = " + f + "\\)"; // Example question
    let ans  = a; //Answer associated with the funciton
    questionDiv.innerHTML = func;
    MathJax.typesetPromise([questionDiv]); 

    submitBtn.addEventListener("click", function() {
        console.log("submit clicked!");
        const userInput = inputLatex.value;
        if (true) {
            //errorMsg.classList.add("hide");
            //alert("Submitted: " + userInput);
            // Assuming further validation or comparison logic here
            if(inputLatex.value==ans){
                //alert("yayyy u got it right ya genius");
                newFunc();
                inputLatex.value = "";
                score = score+1;
                scoreBox.innerHTML = "Score: " + score;
            } else {
                alert("oh nooo thats wrong. da answer is "+ans);
                score = 0;
                scoreBox.innerHTML = "Score: " + score;
            }
        } else {
            errorMsg.textContent = "Please enter a valid derivative.";
            errorMsg.classList.remove("hide");
        }
    });

    //Clicks submit when Enter is pressed
    inputLatex.addEventListener("keypress", function(event){
        if(event.key=="Enter"){
            submitBtn.click();
        }
    });
});