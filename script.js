const STATE  = {
    firstValue: 0,
    secondValue: undefined,
    currentOperator: undefined,
};

const MAX_DISPLAY_NUMBER_SIZE = 7;

const add = function(leftOp, rightOp) {
    return leftOp + rightOp;
}

const subtact = function(leftOp, rightOp) {
    return leftOp - rightOp;
}

const multiply = function(leftOp, rightOp) {
    return leftOp * rightOp;
}

const divide = function(leftOp, rightOp) {
    if (rightOp === 0) {
        return 'lmao';
    }
    return leftOp / rightOp;
}

const operate = function(operator, leftOp, rightOp) {
    if (typeof leftOp === 'string') {
        leftOp = Number.parseFloat(leftOp);
    }
    if (typeof rightOp === 'string') {
        rightOp = Number.parseFloat(rightOp);
    }
    switch (operator) {
        case '+':
            return roundNumber(add(leftOp, rightOp));
        case '-':
            return roundNumber(subtact(leftOp, rightOp));
        case '*':
            return roundNumber(multiply(leftOp, rightOp));
        case '/':
            return roundNumber(divide(leftOp, rightOp));
    }
}

const roundNumber = function(number) {
    if (typeof number === 'number') {
        const strNumber = number.toString();
        if (strNumber.length > MAX_DISPLAY_NUMBER_SIZE) {
            return Number(strNumber.slice(0, MAX_DISPLAY_NUMBER_SIZE));
        }
        return number;
    }
}


const updateSTATE = function(firstValue, secondValue, currentOperator) {
    STATE.firstValue = firstValue;
    STATE.secondValue = secondValue;
    STATE.currentOperator = currentOperator;
}



const updateUI = function() {
    DISPLAY.textContent = STATE.secondValue != null ?
                        `${STATE.secondValue}`:
                        `${STATE.firstValue}`;
}

const handleOperandButton = function(event) {
    const pressedDigit = Number.parseInt(
        event.target.getAttribute('value')
    );
    if (STATE.currentOperator == null) {
        const newFirstValue = `${STATE.firstValue}${pressedDigit}`;
        if (newFirstValue.length > MAX_DISPLAY_NUMBER_SIZE) return;
        STATE.firstValue = roundNumber(Number.parseFloat(newFirstValue));
    } else {
        if (STATE.secondValue == null) {
            STATE.secondValue = 0;
        }
        const newSecondValue = `${STATE.secondValue}${pressedDigit}`
        if (newSecondValue.length > MAX_DISPLAY_NUMBER_SIZE) return;
        STATE.secondValue = roundNumber(Number.parseFloat(newSecondValue));
    }
    updateUI();
}


const handleOperatorButton = function(event) {
    if (STATE.currentOperator == null) {
        STATE.currentOperator = event.target.getAttribute('value');
    } else {
        let result = null;
        if (STATE.firstValue != null && STATE.secondValue != null) {
            result = operate(STATE.currentOperator,STATE.firstValue ,STATE.secondValue);
        } else if (STATE.firstValue != null){
            result = operate(STATE.currentOperator, STATE.firstValue, STATE.firstValue);
        }
        if (result == 'lmao') {
            updateSTATE(0, undefined, undefined);
        } else {
            updateSTATE(result, undefined, event.target.getAttribute('value'));
        }
        updateUI();
    }
}

const handleClearButton = function() {
    updateSTATE(0, undefined, undefined);
    updateUI();
}

const handleEqualsButton = function() {
    if (STATE.firstValue != null && STATE.secondValue != null) {
        let result = operate(STATE.currentOperator, STATE.firstValue, STATE.secondValue);
        updateSTATE(result, undefined, undefined);
        updateUI();
    }
}

const handlePercentButton = function() {
    if (STATE.secondValue != null) {
        STATE.secondValue = roundNumber(STATE.secondValue / 100);
        if (STATE.secondValue.toString().length > MAX_DISPLAY_NUMBER_SIZE) return;
    } else {
        STATE.firstValue = roundNumber(STATE.firstValue / 100);
        if (STATE.firstValue.toString().length > MAX_DISPLAY_NUMBER_SIZE) return;
    }
    updateUI();
}


const handleDecimalButton = function() {
    if (STATE.secondValue != null && !STATE.secondValue.toString().includes('.')) {
        STATE.secondValue = STATE.secondValue + '.'
    } else if (!STATE.firstValue.toString().includes('.')) {
        STATE.firstValue = STATE.firstValue + '.';
    }
    updateUI();
}

const handleChangeSignButton = function() {
    if (STATE.secondValue != null && typeof STATE.secondValue === 'number') {
        STATE.secondValue = -STATE.secondValue;
    } else if (STATE.firstValue != null && typeof STATE.firstValue === 'number') {
        STATE.firstValue = -STATE.firstValue;
    }
    updateUI();
}


const DISPLAY = document.querySelector('.calc-display');
document.querySelectorAll('.operand').forEach((button) => {
    button.addEventListener('click', handleOperandButton);
});
document.querySelector('.clear').addEventListener('click', handleClearButton);
document.querySelectorAll('.operator').forEach((button) => {
    button.addEventListener('click', handleOperatorButton);
})
document.querySelector('.equals').addEventListener('click', handleEqualsButton);
document.querySelector('.percent').addEventListener('click', handlePercentButton);
document.querySelector('.decimal').addEventListener('click', handleDecimalButton);
document.querySelector('.sign').addEventListener('click', handleChangeSignButton);