let grid = document.getElementsByClassName("shape"); // HTMLImg objects
let turn = 'x';
let title = document.getElementById("title");

function forEach(action){
for (let element of Array.from(grid)) action(element);
}

function getImg(index){
    return grid.item(index);
}

function imgClicked(index){
    console.log(index);
    if (getImg(index).src.includes('empty.png')){
        getImg(index).src = `${turn}.png`;
        turn = turn == 'x'? 'o' : 'x';
        title.textContent = `It's ${turn.toUpperCase()}'s turn`;
    }
}

// forEach(img => img.src = 'x.png');