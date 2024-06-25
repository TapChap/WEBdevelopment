import {
    update as updateSnake, draw as drawSnake,
    setDir as moveSnake, addSegment as elongateSnake,
    SNAKE_SPEED, getLocation as getSnakeLocation}
    from './snake.js'
import {draw as drawApple, update as updateApple,
    createApple, getLocation as getAppleLocation} from './apple.js'

let lastRenderTime = 0
let lastDir = 'w';
let gameRunning = true;
const GAME_BOARD = document.getElementById('game-board'); 

function main(timeStamp){
    if (gameRunning) window.requestAnimationFrame(timeStamp => main(timeStamp))
    
    const SECONDS_SINCE_LAST_RENDER = (timeStamp - lastRenderTime) / 1000.0

    if (SECONDS_SINCE_LAST_RENDER < 1 / SNAKE_SPEED) return
    // render a new frame
    lastRenderTime = timeStamp

    update()
    draw()
}
main(0)

function update(){
    updateApple()
    moveSnake(lastDir)
    updateSnake()

    // console.log(`apple, x:${getAppleLocation().x} y: ${getAppleLocation().y}`)
    // console.log(`snake, x:${getSnakeLocation().x} y: ${getSnakedLocation().y}`)

    if (getAppleLocation().x == getSnakeLocation().x && getAppleLocation().y == getSnakeLocation().y) {
        console.log("ate apple!")
        elongateSnake()
        createApple()
    } 
}

function draw(){
    drawSnake(GAME_BOARD)
    drawApple(GAME_BOARD)
}

function isValidDir(dir){
    if (dir == 'w' || dir == 'a'|| dir == 's' || dir == 'd') {}
    else return false;

    if (lastDir == 'w') return dir != 's'
    if (lastDir == 's') return dir != 'w'

    if (lastDir == 'a') return dir != 'd'
    if (lastDir == 'd') return dir != 'a'

    return false;
}

document.addEventListener("keydown", event => {
    if (isValidDir(event.key)) lastDir = event.key;
})

export function endGame(){
    gameRunning = false;
    prompt("Game Ended!")
}