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
    switch (operator) {
        case '+':
            return add(leftOp, rightOp);
        case '-':
            return subtact(leftOp, rightOp);
        case '*':
            return multiply(leftOp, rightOp);
        case '/':
            return divide(leftOp, rightOp);
    }
}