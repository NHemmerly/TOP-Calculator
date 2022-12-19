//Logic for the calculator

let operand_a = 0;
let operand_b = 0;
let opp = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, opp, b) {
    return opp(a, b);
}

function readBtn(e) {
    
}

const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener('click', readBtn));