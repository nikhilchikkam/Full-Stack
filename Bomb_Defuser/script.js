let defuser = document.getElementById("defuser");
let timer = document.getElementById("timer");
let message = document.getElementById("message");
let counter = 10;

let defuseFun = setInterval(function () {
    timer.textContent = counter;
    counter--;

    if (counter < 0) {
        clearInterval(defuseFun);
        timer.textContent = "💥 BOOM!";
        message.textContent = "Oops! You failed to defuse the bomb.";
    }
}, 1000);

defuser.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (defuser.value.trim().toLowerCase() === "defuse" && counter > 0) {
            clearInterval(defuseFun);
            timer.textContent = "✅ You did it!";
            message.textContent = "Bomb successfully defused!";
        } else if (counter <= 0) {
            message.textContent = "Too late! The bomb already exploded.";
        } else {
            message.textContent = "Wrong code! Try again.";
        }
        defuser.value = "";
    }
});
