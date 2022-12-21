//Logic for the calculator

const numReg = /^\d+$/;
const functReg = /[X\+\=\/\-]/gm;
let answer = document.getElementById("answer").innerText;

let operandA = 0;
let operandB = 0;

let lastOpp = '';

//Functions for each of the operations 
function add(a, b) {
    return parseInt(a) + parseInt(b);
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
    if (opp == '+') {
        document.getElementById("answer").innerText = add(a, b);
    }
}

//Functions to carry out calculations
function prepareCalc(opp) {
    if (opp == '=') {
        operate(operandA, lastOpp, operandB);
    } else {
        operandB = document.getElementById("answer").innerText;
        document.getElementById("ongoing").innerText = operandA;
        document.getElementById("operator").innerText = opp;
        document.getElementById("answer").innerText = " ";
        lastOpp = opp;
    }
}


//Functions for calculator button and display functonality
//Updates the display based on buttons clicked, and sets some limits for when the display will update
function updateDisplay(a) {
    if (a == '.' && document.getElementById("answer").innerText.length < 1) {
        document.getElementById("answer").innerText += `0${a}`;
    } else if (a == '.' && !(document.getElementById("answer").innerText.includes('.'))) {
        document.getElementById("answer").innerText += `${a}`;
    } else if (a != '.') {
        document.getElementById("answer").innerText += `${a}`;
    }
    operandA = document.getElementById("answer").innerText;
}

//Reads the content of whichever button is clicked
function readBtn(e) {
    let btnSelect = (e.target.innerText);
    operandA = document.getElementById("answer").innerText;
    let symbols = functReg.test(btnSelect);
    if (symbols) {
        prepareCalc(btnSelect);
    } else if (document.getElementById("answer").innerText.length < 28) {
        if (btnSelect == '0' && document.getElementById("answer").innerText.length > 0) {
            updateDisplay(btnSelect);
        }
        else if (numReg.test(btnSelect) && btnSelect != 0 || btnSelect == '.') {
            updateDisplay(btnSelect);
        }    
    }
}



const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener('click', readBtn));