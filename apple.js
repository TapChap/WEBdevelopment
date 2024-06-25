const BOARD_SIZE = 21;

let x = getRndLocation(0, BOARD_SIZE)
let y = getRndLocation(0, BOARD_SIZE)

export function update(){
}

export function draw(gameBoard){
    const appleElement = document.createElement('div')
    appleElement.style.gridColumnStart = x;
    appleElement.style.gridRowStart = y;
    appleElement.classList.add('apple')
    gameBoard.appendChild(appleElement)
}

export function createApple(){
    x = getRndLocation(0, BOARD_SIZE);
    y = getRndLocation(0, BOARD_SIZE);
}

export function getLocation(){
    return {x: mod(x), y: mod(y)};
}

function getRndLocation(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mod(n){
    while (n <= 0) n += 21
    while (n > 22) n -= 22
    return n;
}