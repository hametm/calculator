const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const equalsButton = document.querySelector(".equalSign");
const clearButton = document.getElementById("clear");
const thumbsUpButton = document.getElementById("thumbsUp");
const decimalButton = document.getElementById("decimal");
const multiplyButton = document.getElementById("multiply");

let clickedOperator;
let tempFirstNumber = "";
let tempSecondNumber = "";
let firstNumber;
let secondNumber;
let operatorIsClicked = false;
let answer = "";
let decimalCount = [];
let messageIsShown = false;

reset();

function add(num1, num2) {
    answer = num1 + num2;
}

function subtract(num1, num2) {
    answer = num1 - num2;
}

function multiply(num1, num2) {
    answer = num1 * num2;
}

function divide(num1, num2) {
    answer = num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+": 
            add(num1, num2);
            break;
        case "-":
            subtract(num1, num2);
            break;
        case "x":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);
            break;
        default:
            showError("ERROR");
            break;
    }
    displayAnswer();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        clearMessage();
        checkforDecimal(button);
        if (checkForTwoDecimals() && button.id === "decimal") return 0;
        displayNumber(button);
        if (button.classList.contains("numbers")) {
            getNumbers(button);
        }
        if (button.classList.contains("operators")) {
            resetDecimal();
            operateNumbers(button);
        }
    });
});

function getNumbers(button) {
    if (!operatorIsClicked) {
        tempFirstNumber += String(button.textContent);
        firstNumber = +tempFirstNumber;
    } else {
        tempSecondNumber += String(button.textContent);
        secondNumber = +tempSecondNumber;
    }
}

function operateNumbers(button) {
    if (operatorIsClicked) {
        operate(clickedOperator, +firstNumber, +secondNumber);
        display.textContent += button.textContent;
        resetOperator(button);
    }
    else {
        clickedOperator = button.textContent;
        operatorIsClicked = !operatorIsClicked;
    }
}

function displayNumber(button) {
    resetFontSize();
    if (button.classList.contains("numbers") && display.textContent === "0" || messageIsShown) {
        display.textContent = String(button.textContent);
    } else {
        display.textContent += String(button.textContent);
    }
}

function displayAnswer() {
    display.textContent = Number((answer).toFixed(3));
}

function resetFontSize() {
    display.style.fontSize = "2.5rem";
}

function checkforDecimal(button) {
    if (button.id === "decimal") decimalCount.push(button.id);
}

function showError(errorMessage) {
    display.textContent = errorMessage;
    messageIsShown = true;
}

function clearMessage() {
    if (messageIsShown) reset();
}

function checkForTwoDecimals() {
    if (decimalCount.length > 1) return true;
}

function resetDecimal() {
    decimalCount.length = 0;
}

function checkZeroDenom() {
    if (secondNumber === 0) {
        showError("DIVISION ERR");
        return true;
    } 
}

function reset() {
    display.textContent = "0";
    tempFirstNumber = "";
    tempSecondNumber = "";
    firstNumber = "";
    secondNumber = "";
    clickedOperator = "";
    operatorIsClicked = false;
    decimalCount.length = 0;
    messageIsShown = false;
    display.style.fontSize = "2.5rem";
}

function resetOperator(button) {
    firstNumber = answer;
    tempSecondNumber = "";
    secondNumber = "";
    clickedOperator = button.textContent;
    decimalCount.length = 0;
}

equalsButton.addEventListener("click", () => {
    if (checkZeroDenom()) return 0;
    operate(clickedOperator, +firstNumber, +secondNumber);
});

clearButton.addEventListener("click", () => {
    reset();
});

thumbsUpButton.addEventListener("click", () => {
    display.textContent = "U GOT THIS!";
    display.style.fontSize = "1.7rem";
    messageIsShown = true;
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        equalsButton.click();
    }
    if (e.key === "*") {
        multiplyButton.click();
    }
    buttons.forEach(button => {
        if (e.key === button.textContent) {
            button.click();
        }
    });
});
