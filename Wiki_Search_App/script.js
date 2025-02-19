let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

// Function to create a result container
function createResultItem(item) {
    let { description, link, title } = item;

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");

    let titleEl = document.createElement("h4");
    titleEl.textContent = title;
    titleEl.classList.add("result-title");

    let anchorEl = document.createElement("a");
    anchorEl.href = link;
    anchorEl.textContent = link;
    anchorEl.target = "_blank";
    anchorEl.classList.add("result-url");

    let paraEl = document.createElement("p");
    paraEl.textContent = description || "No description available.";
    paraEl.classList.add("link-description");

    resultContainer.appendChild(titleEl);
    resultContainer.appendChild(anchorEl);
    resultContainer.appendChild(paraEl);

    searchResults.appendChild(resultContainer);
}

// Function to append search results
function displayResults(results) {
    searchResults.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
        searchResults.innerHTML = "<p class='text-center text-muted'>No results found.</p>";
        return;
    }

    for (let item of results) {
        createResultItem(item);
    }
}

// Function to fetch search results
function fetchResults(event) {
    if (event.key === "Enter") {
        let query = searchInput.value.trim();

        if (query === "") {
            searchResults.innerHTML = "<p class='text-danger text-center'>Please enter a search term.</p>";
            return;
        }

        spinner.classList.remove("d-none");
        searchResults.innerHTML = ""; // Clear old results

        fetch(`https://apis.ccbp.in/wiki-search?search=${query}`)
            .then(response => response.json())
            .then(jsonData => {
                spinner.classList.add("d-none");
                let { search_results } = jsonData;
                displayResults(search_results);
            })
            .catch(error => {
                spinner.classList.add("d-none");
                searchResults.innerHTML = "<p class='text-danger text-center'>Failed to fetch results. Try again.</p>";
                console.error("Error fetching search results:", error);
            });
    }
}

searchInput.addEventListener("keydown", fetchResults);
