let jokeText = document.getElementById("jokeText");
let jokeBtn = document.getElementById("jokeBtn");
let spinner = document.getElementById("spinner");

function getJoke() {
    jokeText.textContent = "";
    spinner.classList.remove("d-none");

    fetch("https://apis.ccbp.in/jokes/random")
        .then(response => response.json())
        .then(result => {
            spinner.classList.add("d-none");
            jokeText.textContent = result.value || "Oops! Couldn't fetch a joke. Try again!";
        })
        .catch(error => {
            spinner.classList.add("d-none");
            jokeText.textContent = "Failed to load joke. Please check your connection.";
            console.error("Error fetching joke:", error);
        });
}

jokeBtn.addEventListener("click", getJoke);
