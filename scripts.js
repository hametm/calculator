const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");

let clickedOperator;
let firstClickedNumber;
let secondClickedNumber;
let operatorClicked = false;
let equalsClicked = false;
let tempFirstNumber = "";
let tempSecondNumber = "";


function add(num1, num2) {
    console.log(num1 + num2);
    return num1 + num2;
}

function subtract(num1, num2) {
    console.log(num1 - num2);
    return num1 - num2;
}

function multiply(num1, num2) {
    console.log(num1 * num2);
    return num1 * num2;
}

function divide(num1, num2) {
    console.log(num1 / num2);
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+": 
            add(num1, num2);
            break;
        case "-":
            subtract(num1, num2);
            break;
        case "*":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);
            break;
        default:
            return "Error";
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent = button.id;
    });
});

numbers.forEach(button => {
    button.addEventListener('click', () => {
        if (operatorClicked == false) {
            tempFirstNumber += String(button.id);
            firstClickedNumber = parseInt(tempFirstNumber);
        } else {
            tempSecondNumber += String(button.id);
            secondClickedNumber = parseInt(tempSecondNumber);
        }
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        operatorClicked = !(operatorClicked);
        clickedOperator = button.id;
    });
});

equals.addEventListener('click', () => {
    console.log("First number: " + firstClickedNumber);
    console.log("Second number: " + secondClickedNumber);
    operate(clickedOperator, +firstClickedNumber, +secondClickedNumber);
});

clear.addEventListener('click', () => {
    display.textContent = "";
    firstClickedNumber = "";
    secondClickedNumber = "";
    clickedOperator = "";
});
