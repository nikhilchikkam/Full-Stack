// Selecting elements
const twentySecondsBtn = document.getElementById("twentySecondsBtn");
const thirtySecondsBtn = document.getElementById("thirtySecondsBtn");
const fortySecondsBtn = document.getElementById("fortySecondsBtn");
const oneMinuteBtn = document.getElementById("oneMinuteBtn");
const timerText = document.getElementById("timerText");

// Timer interval variable
let activeInterval = null;

// Function to clear any existing timers
const clearIntervals = () => {
    if (activeInterval !== null) {
        clearInterval(activeInterval);
        activeInterval = null;
    }
};

// Function to start the countdown timer
const startCountdown = (seconds) => {
    clearIntervals();
    let counter = seconds;
    timerText.textContent = `${counter} seconds left`;

    activeInterval = setInterval(() => {
        counter--;
        timerText.textContent = `${counter} seconds left`;

        if (counter === 0) {
            clearIntervals();
            timerText.textContent = "Your moment is complete";
        }
    }, 1000);
};

// Event listeners for buttons
twentySecondsBtn.addEventListener("click", () => startCountdown(20));
thirtySecondsBtn.addEventListener("click", () => startCountdown(30));
fortySecondsBtn.addEventListener("click", () => startCountdown(40));
oneMinuteBtn.addEventListener("click", () => startCountdown(60));
