const display = document.getElementById("displayText");
const buttons = document.querySelectorAll(".buttons");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const equals = document.querySelector(".equals");
const clear = document.querySelector("#clear");
const mystery = document.querySelector("#mystery");

let clickedOperator;
let tempFirstNumber = "";
let tempSecondNumber = "";
let firstClickedNumber;
let secondClickedNumber;
let operatorIsClicked = false;
let answer = "";


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
    firstClickedNumber = "";
    secondClickedNumber = "";
    clickedOperator = "";
    operatorIsClicked = false;
}

function resetOperator(button) {
    firstClickedNumber = answer;
    tempSecondNumber = "";
    secondClickedNumber = "";
    clickedOperator = button.id;
}

function displayAnswer() {
    display.textContent = Number((answer).toFixed(3));
}

function createMultipleDigitNumber(button) {
    display.textContent += String(button.id);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        createMultipleDigitNumber(button);
    });
});

numbers.forEach(button => {
    button.addEventListener('click', () => {
        if (operatorIsClicked == false) {
            tempFirstNumber += String(button.id);
            firstClickedNumber = +tempFirstNumber;
        } else {
            tempSecondNumber += String(button.id);
            secondClickedNumber = +tempSecondNumber;
        }
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        if (operatorIsClicked == true) {
            operate(clickedOperator, +firstClickedNumber, +secondClickedNumber);
            display.textContent += button.id;
            resetOperator(button);
        }
        else {
            clickedOperator = button.id;
            operatorIsClicked = !(operatorIsClicked);
        }
    });
});

equals.addEventListener('click', () => {
    if (secondClickedNumber == 0) {
        display.textContent = "ERROR";
    } else {
        operate(clickedOperator, +firstClickedNumber, +secondClickedNumber);
    }
});

clear.addEventListener('click', () => {
    reset();
});

mystery.addEventListener('click', () => {
    display.textContent = "I'm Old Gregg!";
});
