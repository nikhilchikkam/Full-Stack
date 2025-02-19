let hoursInput = document.getElementById("hoursInput");
let minutesInput = document.getElementById("minutesInput");
let convertBtn = document.getElementById("convertBtn");
let timeInSeconds = document.getElementById("timeInSeconds");
let errorMsg = document.getElementById("errorMsg");

convertBtn.addEventListener("click", function () {
    timeInSeconds.textContent = "";
    errorMsg.textContent = "";

    // Retrieve values from inputs
    let hours = parseInt(hoursInput.value);
    let minutes = parseInt(minutesInput.value);

    // Validate inputs
    if (isNaN(hours) || hours < 0) {
        errorMsg.textContent = "Please enter a valid positive number for hours.";
        return;
    }
    if (isNaN(minutes) || minutes < 0 || minutes >= 60) {
        errorMsg.textContent = "Please enter a valid number for minutes (0-59).";
        return;
    }

    // Convert hours and minutes to seconds
    let totalSeconds = (hours * 3600) + (minutes * 60);
    timeInSeconds.textContent = `Total Time: ${totalSeconds} seconds`;
});
