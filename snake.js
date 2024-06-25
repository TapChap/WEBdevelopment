import { endGame } from "./game.js";

export const SNAKE_SPEED = 10
const snakeBody = [
    {x: 10, y: 11},
    {x: 11, y: 11},
    {x: 12, y: 11},
]
let direction = 'w'

export function update(){
    // body follows
    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i].x = snakeBody[i - 1].x;
        snakeBody[i].y = snakeBody[i - 1].y;
    }

    // head movment
    if (direction == 'w') moveHeadY(true);
    if (direction == 's') moveHeadY(false);
    if (direction == 'd') moveHeadX(true);
    if (direction == 'a') moveHeadX(false);

    // check for collission
    let head = snakeBody[0];
    for (let i = 1; i < snakeBody.length; i++){
        let segment = snakeBody[i];
        if (segment.x == head.x && segment.y == head.y) endGame()
        }
}

export function draw(gameBoard){
    gameBoard.innerHTML = ""; // delete all children
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridColumnStart = mod(segment.x);
        snakeElement.style.gridRowStart = mod(segment.y);
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

function moveHeadY(up){
    snakeBody[0].y += up? -1 : 1
}

function moveHeadX(right){
    snakeBody[0].x += right? 1 : -1
}

export function addSegment(){
    snakeBody.push({
        x: snakeBody[0].x,
        y: snakeBody[0].y
    })
}

export function setDir(dir){
    direction = dir;
}

export function getLocation(){
    return {x: mod(snakeBody[0].x), y: mod(snakeBody[0].y)}
}

function mod(n){
    while (n <= 0) n += 21
    while (n > 22) n -= 22
    return n;
}