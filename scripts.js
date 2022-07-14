const display = document.getElementById("bottomDisplay");
const buttons = document.querySelectorAll(".buttons");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const equalsButton = document.querySelector(".equalSign");
const clearButton = document.getElementById("clear");
const mysteryButton = document.getElementById("mystery");
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
let errorIsShown = false;

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

function displayAnswer() {
    display.textContent = Number((answer).toFixed(3));
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        clearZero();
        clearError();
        displayNumber(button);
        if (button.classList.contains("numbers")) {
            getNumbers(button);
        }
    });
});

function displayNumber(button) {
    if (button.id === "decimal") {
        decimalCount.push(button.id);
    }
    display.textContent += String(button.textContent);
}

function getNumbers(button) {
    if (!operatorIsClicked) {
        tempFirstNumber += String(button.textContent);
        firstNumber = +tempFirstNumber;
    } else {
        tempSecondNumber += String(button.textContent);
        secondNumber = +tempSecondNumber;
    }
}

operators.forEach(button => {
    button.addEventListener("click", () => {
        if (operatorIsClicked) {
            operate(clickedOperator, +firstNumber, +secondNumber);
            display.textContent += button.textContent;
            resetOperator(button);
        }
        else {
            clickedOperator = button.textContent;
            operatorIsClicked = !operatorIsClicked;
        }
    });
});

function showError(errorMessage) {
    display.textContent = errorMessage;
    errorIsShown = true;
}

function clearError() {
    if (errorIsShown) reset();
}

function checkDecimal() {
    if (decimalCount.length > 1) {
        return true;
    }
}

function clearZero() {
    if (display.textContent === "0") {
        display.textContent = "";
    }
}

function checkZeroDenom() {
    if (secondNumber === 0) {
        showError("DIVISION ERR");
    } else {
        operate(clickedOperator, +firstNumber, +secondNumber);
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
    decimalCount = [];
    errorIsShown = false;
}

function resetOperator(button) {
    firstNumber = answer;
    tempSecondNumber = "";
    secondNumber = "";
    clickedOperator = button.textContent;
    decimalCount = [];
}

equalsButton.addEventListener("click", () => {
    checkZeroDenom();
});

clearButton.addEventListener("click", () => {
    reset();
});

mysteryButton.addEventListener("click", () => {
    display.textContent = "U GOT THIS!";
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
