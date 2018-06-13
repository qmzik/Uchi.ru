let canvas = document.getElementById('canv');

const X_START = 100;
const Y_START = canvas.height / 2;
const Y_CONTROL = Y_START / 1.5;
const ARROW_LENGTH = 20;
const LINE_LEVEL_Y = Y_START + 20;

let c = canvas.getContext('2d');
let firstNumber = document.getElementById('firstNumber');
let secondNumber = document.getElementById('secondNumber');
let coordinates = { 0: 135, 7: 410, 11: 565 };


c.font = "28px Georgia";
drawNumberLine();


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
    let img = new Image();
    img.src = 'sprite.png';
    img.onload = () => {
        c.drawImage(img, X_START, Y_START);
        drawPointerLine(coordinates[0], coordinates[7], coordinates[0] + (coordinates[7] - coordinates[0]) / 2);
    }
}

function drawPointerLine(fromX, toX, cpX) {
    c.strokeStyle = 'purple';
    c.beginPath();
    c.moveTo(fromX, LINE_LEVEL_Y);
    c.quadraticCurveTo(cpX, Y_CONTROL, toX, LINE_LEVEL_Y);
    drawArrow(fromX, toX, Y_CONTROL, LINE_LEVEL_Y);
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
