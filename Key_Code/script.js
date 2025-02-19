let userInput = document.getElementById("userInput");
let keyCodeList = document.getElementById("keyCodeList");

userInput.addEventListener("keydown", function (event) {
    // Ignore keys like Shift, Control, Alt, etc.
    if (event.key.length > 1 && !["Enter", "Backspace", "Space"].includes(event.key)) {
        return;
    }

    let kcItem = document.createElement("li");
    kcItem.textContent = `Key: ${event.key} | Code: ${event.code}`;
    kcItem.classList.add("list-group-item");

    keyCodeList.appendChild(kcItem);
});
