let canvas = document.getElementById('canv');

const COUNT_OF_NUMBERS = 21;
const INTERVAL_LENGTH = 40;
const INTERVAL_MARK_HEIGHT = 10;
const SPACE_BETWEEN_INTERVAL_AND_NUMBER = 30;
const X_START = 100;
const Y_START = canvas.height / 2;
const Y_CONTROL = Y_START / 1.5;
const ARROW_LENGTH = 20;

let c = canvas.getContext('2d');
let firstNumber = document.getElementById('firstNumber');
let secondNumber = document.getElementById('secondNumber');
let coordinates = [];


c.font = "28px Georgia";
drawNumberLine();
drawPointerLine(coordinates[0], coordinates[7], X_START + (coordinates[7] - coordinates[0]) / 2);


let firstInput = document.getElementById('firstInput');
let secondInput = document.getElementById('secondInput');
firstInput.addEventListener('change', () => {
    if(firstInput.value === firstNumber.textContent){
        firstNumber.style.backgroundColor = 'white';
        firstInput.parentNode.replaceChild(createSpanWithNumber(firstNumber.textContent), firstInput);
        drawPointerLine(coordinates[7], coordinates[11], coordinates[7] + (coordinates[11] - coordinates[7]) / 2);
        secondInput.parentElement.style.visibility = 'visible';
    } else {
        firstNumber.style.backgroundColor = 'orange';
        firstInput.style.color = 'red';
    }
});

let result = document.getElementById('result');
let resultInput = document.getElementById('resultInput');

secondInput.addEventListener('change', () => {
    let resultInput = document.getElementById('resultInput');
    if(secondInput.value === secondNumber.textContent) {
        secondNumber.style.backgroundColor = 'white';
        secondInput.parentNode.replaceChild(createSpanWithNumber(secondNumber.textContent), secondInput);
        result.parentNode.replaceChild(resultInput, result);
        resultInput.style.visibility = 'visible';
    } else {
        secondNumber.style.backgroundColor = 'orange';
        secondInput.style.color = 'red';
    }
});

resultInput.addEventListener('change', () => {
    if(resultInput.value === '11') {
        resultInput.parentNode.replaceChild(createSpanWithNumber('11'), resultInput);
    } else {
        resultInput.style.color = 'red';
    }
});

function createSpanWithNumber(number) {
    let span = document.createElement('span');
    span.textContent = number;

    return span;
}

function drawNumberLine() {
    let currentX = X_START;

    for(let i = 0; i < COUNT_OF_NUMBERS; i++) {
        drawIntervalLine(currentX, Y_START + INTERVAL_MARK_HEIGHT, currentX, Y_START - INTERVAL_MARK_HEIGHT, i);
        coordinates[i] = currentX;
        currentX += INTERVAL_LENGTH;
        drawLine(X_START, Y_START, currentX, Y_START, i);
    }

}

function drawLine(fromX, fromY, toX, toY, currentNumber) {
    c.beginPath();
    c.moveTo(fromX, fromY);
    c.lineTo(toX, toY);
    if(currentNumber === COUNT_OF_NUMBERS - 1) {
        drawArrow(fromX, toX, fromY, toY);
    }
    c.stroke();
}

function drawIntervalLine(fromX, fromY, toX, toY, currentNumber) {
    c.beginPath();
    if(currentNumber % 5 === 0) {
        c.font = 'bold 28px Georgia';
        c.lineWidth = 5;
    }
    c.fillText(currentNumber, fromX - 7, fromY + SPACE_BETWEEN_INTERVAL_AND_NUMBER); // fromX-7 - так как число не точно под линией интервала
    c.moveTo(fromX, fromY);
    c.lineTo(toX, toY);
    c.stroke();
    c.font = 'normal 28px Georgia';
    c.lineWidth = 1;
}

function drawPointerLine(fromX, toX, cpX) {
    c.strokeStyle = 'purple';
    c.beginPath();
    c.moveTo(fromX, Y_START);
    c.quadraticCurveTo(cpX, Y_CONTROL, toX, Y_START);
    drawArrow(fromX, toX, Y_CONTROL, Y_START);
    c.stroke();
    c.strokeStyle = 'black';
}

function drawArrow(fromX, toX, fromY, toY) {
    let angle = Math.atan2(toY - fromY, toX - fromX);
    c.lineTo(toX - ARROW_LENGTH * Math.cos(angle - Math.PI / 6), toY - ARROW_LENGTH * Math.sin(angle - Math.PI / 6));
    c.moveTo(toX, toY);
    c.lineTo(toX - ARROW_LENGTH * Math.cos(angle + Math.PI / 6), toY - ARROW_LENGTH * Math.sin(angle + Math.PI / 6));
    c.stroke();
}
