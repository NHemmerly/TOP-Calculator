//Logic for the calculator
//Regex Used
const numReg = /-?\d+$/;
const floatReg = /\./;
const functReg = /[X\+\=\/\-]/;

//Operands and variables
let operandA = 0;
let operandB = 0;
let lastOpp = '';

//Shows if operations just occured 
let postOpp = false;

//DOM Elements
const answer = document.getElementById('answer');
const operator = document.getElementById('operator');
const ongoing = document.getElementById('ongoing');

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
    if (parseFloat(operandA) == 0) {
        return "Cannot Divide by Zero"
    }
    return parseFloat(b) / parseFloat(a);
}

function negateInt(a) {
    answer.innerText = parseFloat(answer.innerText) * -1;
}

//Function that calls operations based on calculator input
function operate(a, opp, b) {
    switch (opp) {
        case '+':
            answer.innerText = add(a, b);
            break;
        case '-':
            answer.innerText = subtract(a, b);
            break;
        case 'X':
            answer.innerText = multiply(a, b);
            break;
        case '/':
            answer.innerText = divide(a, b);
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
        case (operandsFull && operandsNonZero && !(operator.innerText == '=')):
            operate(operandA, lastOpp, operandB);
            operandB = answer.innerText;
            ongoing.innerText = answer.innerText;
            answer.innerText = " "
            lastOpp = opp;
            break;
        default:
            operandB = answer.innerText;
            ongoing.innerText = operandA;
            answer.innerText = " ";
            lastOpp = opp;
    }
    operator.innerText = opp;
}

//Functions for calculator button and display functonality
//Updates the display based on buttons clicked, and sets some limits for when the display will update
function updateDisplay(a) {
    if (a == '.' && answer.innerText.length < 1) {
        answer.innerText += `0${a}`;
    } else if (a == '.' && !(answer.innerText.includes('.'))) {
        answer.innerText += `${a}`;
    } else if (a != '.') {
        answer.innerText += `${a}`;
    }
    operandA = answer.innerText;
}

//Function for clearing the display
function clearDisplay() {
    postOpp = true;
    ongoing.innerText = ' ';
    operator.innerText = '=';
    answer.innerText = ' ';
    operandA = 0;
    operandB = 0;
}

//Function for del button or 'backspace'
function del() {
    if (answer.innerText == `0.`) {
        clearDisplay();
    } else {
        answer.innerText = answer.innerText.slice(0, -1);
    }
}

//Reads the content of whichever button is clicked
function parseBtn(e) {
    let btnStr = e.target.innerText;
    readBtn(btnStr);
}

//Reads the contents of keyboard presses
function parseKey(str) {
    switch (true) {
        case str == 'Backspace': 
            str = 'del';
            readBtn(str);
            break;
        case str == 'Escape':
            str = 'clr';
            readBtn(str);
            break;
        case str == '*':
            str = 'X';
            readBtn(str);
            break;
        case str == 'Enter':
            str = '=';
            readBtn(str);
            break;
        case numReg.test(str) || functReg.test(str) || floatReg.test(str):
            readBtn(str);
            break;
    }   
}

//Reads a string and decides what the calculator should do
function readBtn(btnSelect) {
    let symbols = functReg.test(btnSelect);
    let notEmpty = numReg.test(answer.innerText) || floatReg.test(answer.innerText);

    operandA = answer.innerText;

    switch (true) {
        case (btnSelect == 'clr'):
            clearDisplay();
            break;
        case (btnSelect == 'del'):
            if (postOpp == false || operator.innerText != '=') {
                del();
            }
            break;
        case (btnSelect == 'neg'):
            if (numReg.test(answer.innerText)) {
                negateInt();
            }
            break;
        case (symbols && notEmpty):
            prepareCalc(btnSelect);
            break;
        case (answer.innerText.length < 20):
            if (numReg.test(btnSelect) || floatReg.test(btnSelect)) {
                if (postOpp == true && operator.innerText == '=') {
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
    let code = e.keyCode;
    if (code == 13 || code == 27) {
        e.preventDefault();
    }
    parseKey(name);
})

//Add event listeners to each of the buttons on the calculator
const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener('click', parseBtn));