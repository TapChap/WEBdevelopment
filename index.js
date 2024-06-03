class Pipe {
    constructor(upperImg, lowerImg, xOffset){
        this.upperImg = upperImg;
        this.lowerImg = lowerImg;

        this.x = xOffset;
        this.y = 0;

        this.updatePosition();
    }

    static step = 3;

    static minHeightOffset = -200;
    static maxHeightOffset = 200

    updatePosition(){
        this.upperImg.style.right = `${this.x}px`;
        this.upperImg.style.top = `${this.y}px`;

        this.lowerImg.style.right = `${this.x}px`;
        this.lowerImg.style.bottom = `${-this.y}px`;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    step(){
        this.x += Pipe.step;
        if (this.offScreen()) this.resetPosition();
        
        this.updatePosition();
    }

    resetPosition(){
        this.setPosition(-this.upperImg.offsetWidth, this.randHeight());
    }

    offScreen(){
        return this.x - this.upperImg.offsetWidth > window.innerWidth;
    }

    randHeight(){
        return Math.floor(Math.random() * (Pipe.maxHeightOffset - Pipe.minHeightOffset + 1)) + Pipe.minHeightOffset;
    }    
}
// end of pipe class ----------------------------------------------------------------------------------

let bird = document.getElementById("bird");
let pipeImgs = document.getElementsByClassName("pipe");

let pipes = [];
console.log(pipeImgs);

for(let i = 0; i < pipeImgs.length; i += 2){
    pipes[i] = new Pipe(pipeImgs.item(i), pipeImgs.item(i + 1),  -(window.innerWidth / pipeImgs.length) * i);
}


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

    pipes.forEach(pipe => pipe.step());

}, 20)


function clamp(val, min, max){
    return Math.min(Math.max(val, min), max);
}

function setBirdLocation(x, y) {
    bird.style.left = `${x}px`;
    bird.style.top = `${y}px`;
};