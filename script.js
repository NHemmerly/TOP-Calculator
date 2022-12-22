//Logic for the calculator


//Regex Used
const numReg = /^\d+$/;
const floatReg = /\./;
const functReg = /[X\+\=\/\-]/gm;
let answer = document.getElementById("answer").innerText;

//Operands and variables
let operandA = 0;
let operandB = 0;
let lastOpp = '';

//Shows if operations just occured 
let postOpp = false;

//Functions for each of the operations 
function add(a, b) {
    return parseFloat(b) + parseFloat(a);
}

function subtract(a, b) {
    return parseFloat(b) - parseFloat(a);
}

function multiply(a, b) {
    return parseFloat(b) * parseFloat(a);
}

function divide(a, b) {
    return parseFloat(b) / parseFloat(a);
}

function operate(a, opp, b) {
    switch (opp) {
        case '+':
            document.getElementById("answer").innerText = add(a, b);
            break;
        case '-':
            document.getElementById("answer").innerText = subtract(a, b);
            break;
        case 'X':
            document.getElementById("answer").innerText = multiply(a, b);
            break;
        case '/':
            document.getElementById("answer").innerText = divide(a, b);
            break;
    }
}

//Functions to carry out calculations
function prepareCalc(opp) {
    let operandsFull = (numReg.test(operandA) && numReg.test(operandB));
    let operandsNonZero = (operandA != 0 && operandB != 0);
    if (opp == '=') {
        operate(operandA, lastOpp, operandB);
        postOpp = true;
        document.getElementById("operator").innerText = opp;
    } else if (operandsFull && operandsNonZero) {
        operate(operandA, lastOpp, operandB);
        operandB = document.getElementById("answer").innerText;
        document.getElementById("operator").innerText = opp;
        document.getElementById("ongoing").innerText = document.getElementById("answer").innerText;
        document.getElementById("answer").innerText = " "
        lastOpp = opp;
    }
    else {
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

function clearDisplay() {
    document.getElementById("ongoing").innerText = ' ';
    document.getElementById("operator").innerText = '=';
    document.getElementById("answer").innerText = ' ';
    operandA = 0;
    operandB = 0;
}

//Reads the content of whichever button is clicked
function readBtn(e) {
    let btnSelect = (e.target.innerText);
    let symbols = functReg.test(btnSelect);
    let notEmpty = numReg.test(document.getElementById("answer").innerText) || floatReg.test(document.getElementById("answer").innerText);
    
    operandA = document.getElementById("answer").innerText;

    switch (true) {
        case (btnSelect == 'clr'):
            clearDisplay();
            break;
        case (symbols && notEmpty):
            prepareCalc(btnSelect);
            break;
        case (document.getElementById("answer").innerText.length < 20):
            if (btnSelect == '0' && document.getElementById("answer").innerText.length > 0) {
                updateDisplay(btnSelect);
            } else if (numReg.test(btnSelect) && btnSelect != 0 || floatReg.test(btnSelect)) {
                if (postOpp == true) {
                    clearDisplay();
                    postOpp = false;
                    updateDisplay(btnSelect);
                } else {
                    updateDisplay(btnSelect);
                }
            }
            break;
    }

}



const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener('click', readBtn));