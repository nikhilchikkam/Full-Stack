let resultCountries = document.getElementById("resultCountries");
let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");

// Function to display country list
function displayCountries(myArray) {
    resultCountries.innerHTML = ""; // Clear previous results

    if (myArray.length === 0) {
        resultCountries.innerHTML = "<p class='text-center text-muted'>No results found</p>";
        return;
    }

    for (let country of myArray) {
        const { name, flag, population } = country;

        let countryContainer = document.createElement("div");
        countryContainer.classList.add("country-card");

        let flagContainer = document.createElement("img");
        flagContainer.src = flag;
        flagContainer.classList.add("country-flag");

        let infoContainer = document.createElement("div");

        let countryName = document.createElement("p");
        countryName.textContent = name;
        countryName.classList.add("country-name");

        let countryPopulation = document.createElement("p");
        countryPopulation.textContent = `Population: ${population.toLocaleString()}`;
        countryPopulation.classList.add("country-population");

        infoContainer.appendChild(countryName);
        infoContainer.appendChild(countryPopulation);

        countryContainer.appendChild(flagContainer);
        countryContainer.appendChild(infoContainer);
        resultCountries.appendChild(countryContainer);
    }
}

// Function to filter countries based on search input
function filterCountries(data, input) {
    let filteredData = data.filter(country =>
        country.name.toLowerCase().includes(input.toLowerCase())
    );
    displayCountries(filteredData);
}

// Function to fetch country data
function fetchCountries() {
    let input = searchInput.value.trim();
    
    if (input === "") {
        displayCountries([]); // Clear results if input is empty
        return;
    }

    spinner.classList.remove("d-none");

    fetch("https://restcountries.com/v2/all")
        .then(response => response.json())
        .then(data => {
            spinner.classList.add("d-none");
            filterCountries(data, input);
        })
        .catch(error => {
            spinner.classList.add("d-none");
            resultCountries.innerHTML = `<p class="text-danger text-center">Failed to load data.</p>`;
            console.error("Error fetching data:", error);
        });
}

// Event listener for search input
searchInput.addEventListener("keyup", fetchCountries);
