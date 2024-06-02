document.addEventListener("DOMContentLoaded", function() {
    //JS currently does not represent updated (sans-calculator)
    //elements. Modify JS to involve the correct
    //elements, and then implement deriv functionality /:)

    const questionDiv = document.getElementById("question");
    const inputLatex = document.getElementById("input-latex");
    const submitBtn = document.getElementById("submit-btn");
    const errorMsg = document.getElementById("error-msg");

    const func = "\\( f(x) = x^2 \\)"; // Example question
    questionDiv.innerHTML = func;
    MathJax.typesetPromise([questionDiv]);

    function validateDerivative(input) {
        // Basic validation for a derivative, could be improved with more complex checks
        return input && input.trim().length > 0;
    }

    function renderLatexInput() {
        const userInput = inputLatex.value;
        latexOutput.innerHTML = `\\(${userInput}\\)`;
        //MathJax.typesetPromise([latexOutput]);
    }

    inputLatex.addEventListener("input", renderLatexInput);

    submitBtn.addEventListener("click", function() {
        console.log("submit button wuz clikced")
        const userInput = inputLatex.value;
        if (true) {
            errorMsg.classList.add("hide");
            alert("Submitted: " + userInput);
            // Assuming further validation or comparison logic here
        } else {
            errorMsg.textContent = "Please enter a valid derivative.";
            errorMsg.classList.remove("hide");
        }
    });
});