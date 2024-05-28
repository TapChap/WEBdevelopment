const counter = document.getElementById("counter");
const clickbttn = document.getElementById("click");
const resetbttn = document.getElementById("reset");
const targetInput = document.getElementById("target");
const submitbttn = document.getElementById("submit");
const bestBoard=  document.getElementById("bestBoard");

let startTime = Date.now();
let targetClicks = 5, best = 0;

clickbttn.onclick = function(){
    counter.textContent = Number(counter.textContent) + 1;
    if (counter.textContent == targetClicks) {
        
        let cps = targetClicks / ((Date.now() - startTime) / 1000);
        if (cps > best) {
            console.log(`New Best! ${best}`);
            best = cps;
            bestBoard.innerHTML = `CPS: ${Math.round(best)}`;
        }
        startTime= Date.now();
        counter.textContent = 0;
    }
}

resetbttn.onclick = function(){
    counter.textContent = 0;
    startTime= Date.now();
}

submitbttn.onclick = function(){
    targetClicks = targetInput.value;
    best = 0;
    bestBoard.innerHTML = `best: ${Math.round(best)}`;
}