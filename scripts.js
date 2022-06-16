const display = document.querySelector("#bottomDisplay");
const buttons = document.querySelectorAll(".buttons");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const equals = document.querySelector(".equalSign");
const clear = document.querySelector("#clear");
const mystery = document.querySelector("#mystery");
const decimal = document.querySelector("#decimal");

let clickedOperator;
let tempFirstNumber = "";
let tempSecondNumber = "";
let firstNumber;
let secondNumber;
let operatorIsClicked = false;
let answer = "";
let decimalIsClicked = false;


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
            return "ERROR";
    }
    displayAnswer();
}

function reset() {
    display.textContent = "";
    tempFirstNumber = "";
    tempSecondNumber = "";
    firstNumber = "";
    secondNumber = "";
    clickedOperator = "";
    operatorIsClicked = false;
    decimalIsClicked = false;
}

function resetOperator(button) {
    firstNumber = answer;
    tempSecondNumber = "";
    secondNumber = "";
    clickedOperator = button.textContent;
    decimalIsClicked = false;
}

function displayAnswer() {
    display.textContent = Number((answer).toFixed(3));
}

function createMultipleDigitNumber(button) {
    // Make this a loop instead so you can get the decimal working?
    display.textContent += String(button.textContent);
    if (button.id == "decimal") {
        decimalIsClicked = true;
    }
}

function checkDecimal() {
    if (decimalIsClicked) {
        console.log("Decimal True");
        // SOMETHING HERE
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        createMultipleDigitNumber(button);
    });
});

numbers.forEach(button => {
    button.addEventListener('click', () => {
        if (operatorIsClicked == false) {
            tempFirstNumber += String(button.textContent);
            firstNumber = +tempFirstNumber;
        } else {
            tempSecondNumber += String(button.textContent);
            secondNumber = +tempSecondNumber;
        }
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        if (operatorIsClicked == true) {
            operate(clickedOperator, +firstNumber, +secondNumber);
            display.textContent += button.textContent;
            resetOperator(button);
        }
        else {
            clickedOperator = button.textContent;
            operatorIsClicked = !(operatorIsClicked);
        }
    });
});

equals.addEventListener('click', () => {
    if (secondNumber == 0) {
        display.textContent = "ERROR";
    } else {
        operate(clickedOperator, +firstNumber, +secondNumber);
    }
});

clear.addEventListener('click', () => {
    reset();
});

mystery.addEventListener('click', () => {
    display.textContent = "I'm Old Gregg!";
});