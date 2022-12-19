//Logic for the calculator

let runningProd = 0;

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

console.log(add(20, 2));
console.log(subtract(20, 2));
console.log(multiply(20, 2));
console.log(divide(20, 2));

console.log(operate(20, add, 2));