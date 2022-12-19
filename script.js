//Logic for the calculator

let operandA = 0;
let operandB = 0;
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

function updateDisplay(a) {
    document.getElementById("answer").innerText = `${a}`;
}

function readBtn(e) {
    let btnSelect = (e.target.innerText);
    console.log(btnSelect);
    updateDisplay(btnSelect);
}



const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener('click', readBtn));
console.log(document.querySelector(".btn").textContent);