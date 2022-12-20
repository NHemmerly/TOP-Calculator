//Logic for the calculator

const numReg = /^\d+$/;
let answer = document.getElementById("answer").innerText;

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
    document.getElementById("answer").innerText += a;
}

function readBtn(e) {
    let btnSelect = (e.target.innerText);
    if (btnSelect == '0' && document.getElementById("answer").innerText.length > 0) {
        updateDisplay(btnSelect);
    }
    else if (numReg.test(btnSelect) && btnSelect != 0) {
        updateDisplay(btnSelect);
    }
}



const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener('click', readBtn));