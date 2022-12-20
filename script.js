//Logic for the calculator

const numReg = /^\d+$/;
const functReg = /[X\+\=\/\-]/gm;
let answer = document.getElementById("answer").innerText;

let operandA = 0;
let operandB = 0;

//Functions for each of the operations 
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
    switch (opp) {
        case '+':
            opp = 'add';
            break;
        case '-':
            opp = 'subtract';
            break;
        case 'X':
            opp = 'multiply';
            break;
        case '/':
            opp = 'divide';
            break;
    }
    return opp(a, b);
}

//Functions to carry out calculations
function prepareCalc(opp) {
    if (opp = '=') {
        operate(operandA, lastOpp, operandB);
    } else {
        document.getElementById("ongoing").innerText = operandA;
        document.getElementById("operator").innerText = opp;
        document.getElementById("answer").innerText = " ";
    }
    let lastOpp = opp;
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
    switch (true) {
        case functReg.test(btnSelect):
            prepareCalc(btnSelect);
            break;

        case document.getElementById("answer").innerText.length < 28:
            if (btnSelect == '0' && document.getElementById("answer").innerText.length > 0) {
                updateDisplay(btnSelect);
            }
            else if (numReg.test(btnSelect) && btnSelect != 0 || btnSelect == '.') {
                updateDisplay(btnSelect);
            }
            break;
    }
}



const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener('click', readBtn));