let bird = document.getElementById("bird");
let pipes = document.getElementsByClassName("pipe");

let birdY = window.innerHeight / 2;
let birdVel = 0;
let jumpForce = -10, gravity = 0.5;
let minVel = -20, maxVel = 20;

document.addEventListener("keydown", keyDown => {
    if (keyDown.key === "ArrowUp") {
        if (birdVel > 0) birdVel = jumpForce;
        else birdVel += jumpForce;
    }
})

setInterval(() => { // main loop
    birdVel = clamp(birdVel + gravity, minVel, maxVel);
    birdY = clamp(birdY + birdVel, 0, window.innerHeight - bird.offsetHeight);

    if(birdY == 0) birdVel = 5;
    if(birdY == window.innerHeight - bird.offsetHeight) birdVel = -10;

    bird.style.transform = `rotate(${birdVel * 3}deg)`;
    setBirdLocation(window.innerWidth / 5, birdY);  

    // pipes
    for (let i = 0; i ++; i < pipes.length){
        console.log(1);
        let pipe = pipes.item(i);
        let pipeX = pipe.style.right;

        // pipeX += pipeOffset;
        // if (pipeX > window.innerWidth) {
        //     pipeX = -pipe.offsetWidth;
        //     pipeY = getRandNum(-200, 200);
        // }

    pipe.style.right = `${pipeX}px`;
    pipe.style.top = `${pipeY}px`;
}
}, 20)


function clamp(val, min, max){
    return Math.min(Math.max(val, min), max);
}

function setBirdLocation(x, y) {
    bird.style.left = `${x}px`;
    bird.style.top = `${y}px`;
};

function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}