const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons");
const operators = document.querySelectorAll(".operators");
const numbers = document.querySelectorAll(".numbers");

let clickedOperator;
let clickedNumber;


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
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

function calculate() {
    // operate(clickedOperator, )
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent = button.id;
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        clickedOperator = button.id;
        console.log(clickedOperator);
    });
});

numbers.forEach(button => {
    button.addEventListener('click', () => {
        clickedNumber = button.id;
        console.log(clickedNumber);
    });
});