const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const equals = document.querySelector(".equals");
const clear = document.querySelector("#clear");
const mystery = document.querySelector("#mystery");

let clickedOperator;
let firstClickedNumber;
let secondClickedNumber;
let operatorClicked = false;
let equalsClicked = false;
let tempFirstNumber = "";
let tempSecondNumber = "";
let answer = "";


function add(num1, num2) {
    console.log(num1 + num2);
    answer = num1 + num2;
}

function subtract(num1, num2) {
    console.log(num1 - num2);
    answer = num1 - num2;
}

function multiply(num1, num2) {
    console.log(num1 * num2);
    answer = num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) {
        display.textContent = "ERROR DIVIDE BY ZERO";
        return 0;
    }
    console.log(num1 / num2);
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
}

function reset() {
    display.textContent = "";
    tempFirstNumber = "";
    tempSecondNumber = "";
    firstClickedNumber = "";
    secondClickedNumber = "";
    clickedOperator = "";
    operatorClicked = false;
    equalsClicked = false;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (equalsClicked) {
            reset();
        }
        display.textContent += String(button.id);
    });
});

numbers.forEach(button => {
    button.addEventListener('click', () => {
        if (operatorClicked == false) {
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
        if (operatorClicked == true && equalsClicked == false) {
            operate(clickedOperator, +firstClickedNumber, +secondClickedNumber);
            display.textContent = Number((answer).toFixed(6)) + button.id;
            firstClickedNumber = answer;
            tempSecondNumber = "";
            secondClickedNumber = "";
        } else {
            clickedOperator = button.id;
            operatorClicked = !(operatorClicked);
        }
    });
});

equals.addEventListener('click', () => {
    equalsClicked = true;
    console.log("First number: " + firstClickedNumber);
    console.log("Second number: " + secondClickedNumber);
    operate(clickedOperator, +firstClickedNumber, +secondClickedNumber);
    display.textContent = Number((answer).toFixed(6));
});

clear.addEventListener('click', () => {
    reset();
});

mystery.addEventListener('click', () => {
    display.textContent = "I'm Old Gregg!";
});
