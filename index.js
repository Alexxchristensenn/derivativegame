document.addEventListener("DOMContentLoaded", function() {
    //JS currently does not represent updated (sans-calculator)
    //elements. Modify JS to involve the correct
    //elements, and then implement deriv functionality /:)

    const questionDiv = document.getElementById("question");
    const inputLatex = document.getElementById("input-latex");
    const submitBtn = document.getElementById("submit-btn");
    const errorMsg = document.getElementById("error-msg");

    //Try storing function/derivative pairs in a giant hash map!
    const funcMap = new Map();
    funcMap.set("1", {f: "2x^2", a: "4x"});
    funcMap.set("2", {f: "3x+1", a: "3"});
    funcMap.set("3", {f: "5x^3", a: "15x^2"});
    
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
            } else {
                //alert("oh nooo thats wrong")
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