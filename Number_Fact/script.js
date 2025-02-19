let fact = document.getElementById("fact");
let userInput = document.getElementById("userInput");
let spinner = document.getElementById("spinner");

function fetchFact(event) {
    if (event.key === "Enter") {
        let input = userInput.value.trim();

        if (input === "" || isNaN(input)) {
            fact.textContent = "Please enter a valid number.";
            return;
        }

        spinner.classList.remove("d-none");

        fetch(`https://apis.ccbp.in/numbers-fact?number=${input}`)
            .then(response => response.json())
            .then(data => {
                spinner.classList.add("d-none");
                fact.textContent = data.fact || "No fact available for this number.";
            })
            .catch(error => {
                spinner.classList.add("d-none");
                fact.textContent = "Error fetching fact. Please try again.";
                console.error("Error:", error);
            });
    }
}

userInput.addEventListener("keydown", fetchFact);
