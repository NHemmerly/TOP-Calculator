//Logic for the calculator
//Regex Used
const numReg = /^\d+$/;
const floatReg = /\./;
const functReg = /[X\+\=\/\-]/gm;

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

//Function that calls operations based on calculator input
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

//Functions that call the logic that complete calculaions
function prepareCalc(opp) {
    let operandsFull = (numReg.test(operandA) && numReg.test(operandB));
    let operandsNonZero = (operandA != 0 && operandB != 0);
    switch (true) {
        case (opp == '='):
            operate(operandA, lastOpp, operandB);
            postOpp = true;
            break;
        case (operandsFull && operandsNonZero):
            operate(operandA, lastOpp, operandB);
            operandB = document.getElementById("answer").innerText;
            document.getElementById("ongoing").innerText = document.getElementById("answer").innerText;
            document.getElementById("answer").innerText = " "
            lastOpp = opp;
            break;
        default:
            operandB = document.getElementById("answer").innerText;
            document.getElementById("ongoing").innerText = operandA;
            document.getElementById("answer").innerText = " ";
            lastOpp = opp;
    }
    document.getElementById("operator").innerText = opp;
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

//Function for clearing the display
function clearDisplay() {
    document.getElementById("ongoing").innerText = ' ';
    document.getElementById("operator").innerText = '=';
    document.getElementById("answer").innerText = ' ';
    operandA = 0;
    operandB = 0;
}

//Function for del button or 'backspace'
function del() {
    if (document.getElementById("answer").innerText == `0.`) {
        clearDisplay();
    } else {
        document.getElementById("answer").innerText = document.getElementById("answer").innerText.slice(0, -1);
    }
}

//Reads the content of whichever button is clicked
function parseBtn(e) {
    let btnStr = e.target.innerText;
    readBtn(btnStr);
}

//Reads the contents of keyboard presses
function parseKey(str) {
    switch (str) {
        case 'Backspace': 
            str = 'del';
            break;
        case '*':
            str = 'X';
            break;
        case 'Enter':
            str = '=';
            break;
    }   
    readBtn(str);
}

//Reads a string and decides what the calculator should do
function readBtn(btnSelect) {
    let symbols = functReg.test(btnSelect);
    let notEmpty = numReg.test(document.getElementById("answer").innerText) || floatReg.test(document.getElementById("answer").innerText);

    operandA = document.getElementById("answer").innerText;

    switch (true) {
        case (btnSelect == 'clr'):
            clearDisplay();
            break;
        case (btnSelect == 'del'):
            del();
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

//Event Listener for keyboard functionality on the document
document.addEventListener('keydown', (e) => {
    let name = e.key;
    parseKey(name);
})

//Add event listeners to each of the buttons on the calculator
const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener('click', parseBtn));