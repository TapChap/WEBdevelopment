const display = document.getElementById("display");

function appendToDisplay(toAppend){
    display.value += toAppend;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try {
        display.value = Number(eval(display.value)).toFixed(2);
    } catch {
        display.value = "Error!"
        console.error("Sytax Error!")
    }
}

function isOperation(key){
    return key == '-' || key == '+' || key == '*' || key == '/' || key == '=' || key == '.';
}

document.addEventListener('keydown', function(event) {
    if (event.key == 'c') clearDisplay();
    if (event.key == 'Enter') calculate();
    if (event.key >= '0' && event.key <= '9') display.value += event.key;
    if (event.key == 'Backspace') display.value = String(display.value).substring(0, String(display.value).length - 1);
    if (isOperation(event.key)) display.value += event.key;
})