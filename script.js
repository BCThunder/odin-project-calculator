const MAX_DIGITS = 5;

let num1 = "0";
let num2 = "0";
let resultNum = "0";
let operator = "";
let isFirstNum = true;

const displayEl = document.querySelector(".bottom-right-text");
const btns = document.querySelectorAll('.btn');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator:not(#equal)');
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('.clear');

numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        handleNumber(btn.dataset.value);
    });
});

operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        handleOperator(btn.dataset.value);
    });
})

equalButton.addEventListener("click", () => {
    handleEqual();
})

clearButton.addEventListener("click", () => {
    handleClear();
})

/* Event Handler Functions */
function handleNumber(num) {
    if (isFirstNum && num1.length < MAX_DIGITS) {
        if (num1 == "0") { num1 = ""; }
        num1 += parseInt(num, 10);
        updateDisplay(num1);
    }
    else if (!isFirstNum && num2.length < MAX_DIGITS) {
        if (num2 == "0") { num2 = ""; }
        num2 += parseInt(num, 10);
        updateDisplay(num2);
    }
}

function handleOperator(op) {
    operator = op;
    isFirstNum = false;
    updateDisplay(num2);
}

function handleClear() {
    if (isFirstNum) {
        num1 = "0";
        operator = "";
    } else {
        num2 = "0";
    }
    updateDisplay("0");
}

function handleEqual() {
    if (operator != "") {
        resultNum = operate(num1, num2, operator);
        resultNum = formatResult(resultNum);
        updateDisplay(resultNum);
        num1 = resultNum.toString();
        operator = "";
        num2 = "0";
    }
}

/* Math Operations */
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b == 0) { return "Error"; }
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result = 0;
    if (operator == "+") {
        result = add(a, b);
    }
    else if (operator == "-") {
        result = subtract(a, b);
    }
    else if (operator == "/") {
        result = divide(a, b);
    }
    else if (operator == "*") {
        result = multiply(a, b);
    }

    return result
}

function formatResult(res) {
    if (res === "Error") return res;
    if (!isFinite(res)) return "Error";
    const rounded = Math.round(res * 1e5) / 1e5;
    let s = rounded.toString();
    if (s.indexOf('.') !== -1) {
        s = s.replace(/\.0+$|0+$/,'');
        s = s.replace(/\.$/, '');
    }
    return s;
}

function updateDisplay(numToDisplay) {
    displayEl.textContent = numToDisplay.toString();
}