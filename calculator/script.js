let display = document.getElementById("display");

function appendCharacter(char) {
    if (display.innerText === "0" && char !== ".") {
        display.innerText = char;
    } else {
        display.innerText += char;
    }
}

function clearDisplay() {
    display.innerText = "0";
}

function deleteCharacter() {
    display.innerText = display.innerText.slice(0, -1) || "0";
}

function calculateResult() {
    try {
        display.innerText = eval(display.innerText);
    } catch {
        display.innerText = "Error";
    }
}
