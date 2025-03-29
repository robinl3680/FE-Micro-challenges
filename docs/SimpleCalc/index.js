let numberSection = document.querySelector('.number-section');
createNumbers();
createOperators();
function createNumbers() {
  for(let i = 9; i >= 0; i--) {
    const btn = document.createElement('button');
    btn.innerHTML = i;
    btn.setAttribute('id', i);
    numberSection.appendChild(btn);
  }
}

function createOperators() {
  const decimalBtn = document.createElement('button');
  decimalBtn.innerHTML = '.';
  decimalBtn.setAttribute('id', 'decimal');
  numberSection.appendChild(decimalBtn);
  const equalButton = document.createElement('button');
  equalButton.innerHTML = '=';
  equalButton.setAttribute('id', 'equal');
  numberSection.appendChild(equalButton);
  const operatorSection = document.querySelector('.operator-section');
  const plusBtn = document.createElement('button');
  plusBtn.innerHTML = '+';
  plusBtn.setAttribute('id', '+');
  operatorSection.appendChild(plusBtn);
  const minusBtn = document.createElement('button');
  minusBtn.innerHTML = '-';
  minusBtn.setAttribute('id', '-');
  operatorSection.appendChild(minusBtn);
  const starBtn = document.createElement('button');
  starBtn.innerHTML = '*';
  starBtn.setAttribute('id', '*');
  operatorSection.appendChild(starBtn);
  const divBtn = document.createElement('button');
  divBtn.innerHTML = '/';
  divBtn.setAttribute('id', '/');
  operatorSection.appendChild(divBtn);
}

document.querySelector('.main-btn-section').addEventListener('click', onClickBtnHandler);
let prevExpression = '';
const expressionSection = document.querySelector('.expression-section');
const expressions = ['*', '/', '-', '+', '.']
function onClickBtnHandler(evt) {
    if(evt.target.getAttribute('id') !== null && evt.target.innerHTML !== '=') {
        const lastCharacter = prevExpression[prevExpression.length - 1];
        if((expressions.includes(lastCharacter) && expressions.includes(evt.target.innerHTML))) {
            prevExpression = prevExpression.replace(lastCharacter, evt.target.innerHTML);
        } else {
            prevExpression += evt.target.innerHTML;
        }
        expressionSection.innerHTML = prevExpression;
    } else if(evt.target.innerHTML === '=') {
        expressionSection.innerHTML = findResult();
        prevExpression = expressionSection.innerHTML;
    }
}

const precedences = {'/': 2, '*': 2, '+': 1, '-': 1};
const operators = [];
const operands = [];

function getPrecedence(op) {
    return precedences[op];
}

function applyOp(val1, val2, op) {
    switch(op) {
        case '+':
            return val1 + val2;
        case '-':
            return val1 - val2;
        case '*':
            return val1 * val2;
        case '/':
            return val1 / val2;
    }
}

function findResult() {
    const expression = expressionSection.innerHTML;
    for(let i = 0 ; i < expression.length; i++) {
        if(!isNaN(expression[i])) {
            let num = '';
            while((!isNaN(expression[i]) || expression[i] === '.') && i < expression.length) {
                num += expression[i];
                i++;
            }
            operands.push(+num);
            i--;
        } else {
            while(operators.length && getPrecedence(operators[operators.length - 1]) >= getPrecedence(expression[i])) {
                let val2 = operands.pop();
                let val1 = operands.pop();
                let operator = operators.pop();
                operands.push(applyOp(val1, val2, operator));
            }
            operators.push(expression[i]);
        }
    }
    while(operators.length) {
        let val2 = operands.pop();
        let val1 = operands.pop();
        let operator = operators.pop();
        operands.push(applyOp(val1, val2, operator));
    }
    return operands.pop();
}

function clearExpression() {
    prevExpression = '';
    expressionSection.innerHTML = '';
}

function backspace() {
    prevExpression = prevExpression.substr(0, prevExpression.length - 1);
    expressionSection.innerHTML = prevExpression;
}