// DOM Elements
const input = document.getElementById("user-input");

// Imput animation
input.addEventListener("focus", function () {
    input.style.animationPlayState = "running";
});

input.addEventListener("blur", function () {
    input.style.animationPlayState = "paused";
});

// Get Active ELement Id
function onMouseUp(e) {
    const activeTextarea = document.activeElement;
    const selection = activeTextarea.value.substring(
        activeTextarea.selectionStart,
        activeTextarea.selectionEnd
    );

    console.log(selection);
}