const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const seconds = document.getElementById("seconds");
const spinner = document.getElementById("spinner");

let intervalId;
const url = "https://apis.ccbp.in/random-quote";

// Function to fetch and display quote
const fetchQuote = async () => {
    try {
        spinner.classList.remove("d-none");
        const response = await fetch(url);
        const data = await response.json();

        spinner.classList.add("d-none");
        quoteDisplay.textContent = data.content;
        startTimer();
    } catch (error) {
        spinner.classList.add("d-none");
        quoteDisplay.textContent = "⚠️ Error fetching quote. Please try again.";
    }
};

// Function to start the timer
const startTimer = () => {
    clearInterval(intervalId);
    seconds.textContent = 0;

    intervalId = setInterval(() => {
        seconds.textContent = parseInt(seconds.textContent) + 1;
    }, 1000);
};

// Function to check the user's input
const checkTyping = () => {
    if (quoteInput.value.trim() === quoteDisplay.textContent) {
        clearInterval(intervalId);
        document.getElementById("result").textContent = `✅ You typed in ${seconds.textContent} seconds!`;
    } else {
        document.getElementById("result").textContent = "❌ Incorrect text. Try again!";
    }
};

// Function to reset the test
const resetTest = () => {
    quoteDisplay.textContent = "";
    quoteInput.value = "";
    document.getElementById("result").textContent = "";
    fetchQuote();
};

// Event Listeners
submitBtn.addEventListener("click", checkTyping);
resetBtn.addEventListener("click", resetTest);

// Load the first quote
fetchQuote();
