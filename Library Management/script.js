let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");
let reusltHeading = document.getElementById("reusltHeading");
let resultEmpty = document.getElementById("resultEmpty");


function renderBook(book) {
    console.log("Rendering book: ", book);  // Add this to debug

    let { title, imageLink, author } = book;
    
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-4");

    let bookContainer = document.createElement("div");
    let imageElement = document.createElement("img");
    imageElement.src = imageLink;
    imageElement.classList.add("img-fluid", "rounded");

    let titleElement = document.createElement("h5");
    titleElement.textContent = title;
    titleElement.classList.add("mt-2");

    let authorElement = document.createElement("p");
    authorElement.textContent = author;

    bookContainer.classList.add("book-container", "text-center");
    bookContainer.appendChild(imageElement);
    bookContainer.appendChild(titleElement);
    bookContainer.appendChild(authorElement);

    colDiv.appendChild(bookContainer);
    searchResults.appendChild(colDiv);
}


function displayBooks(books) {
    searchResults.innerHTML = "";
    if (books.length === 0) {
        resultEmpty.classList.remove("d-none"); // Show "No results found"
        reusltHeading.classList.add("d-none");  // Hide results heading
    } else {
        resultEmpty.classList.add("d-none");    // Hide "No results found"
        reusltHeading.classList.remove("d-none"); // Show results heading
        for (let book of books) {
            renderBook(book);
        }
    }
}

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        resultEmpty.classList.add("d-none");  // Hide "No results found" initially
        spinner.classList.remove("d-none");   // Show the spinner while searching
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput.value;
        fetch(url).then(function(response) {
            return response.json();
        }).then(function(resultObj) {
            console.log(resultObj.search_results); // Log the results
            spinner.classList.add("d-none");      // Hide spinner after getting results
            displayBooks(resultObj.search_results); // Show the results or "No results found"
        }).catch(function(error) {
            console.error("Error fetching books: ", error);
            spinner.classList.add("d-none");      // Hide spinner on error
            resultEmpty.classList.remove("d-none"); // Show "No results found" in case of error
        });
    }
});
