let bookmarkForm = document.getElementById("bookmarkForm");
let siteNameInput = document.getElementById("siteNameInput");
let siteUrlInput = document.getElementById("siteUrlInput");
let bookmarksList = document.getElementById("bookmarksList");

// Function to create a bookmark item
function createListItem(name, link) {
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    let titleElement = document.createElement("span");
    titleElement.textContent = name;

    let anchorElement = document.createElement("a");
    anchorElement.href = link;
    anchorElement.textContent = "Visit";
    anchorElement.target = "_blank";
    anchorElement.classList.add("btn", "btn-success", "ml-3");

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        listItem.remove();
    };

    listItem.append(titleElement, anchorElement, deleteButton);
    bookmarksList.appendChild(listItem);
}

// Validate URL format
function isValidURL(url) {
    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-z]{2,}){1,2}(\/.*)?$/;
    return regex.test(url);
}

// Error Handling and Submission
function validateAndSubmit() {
    let siteName = siteNameInput.value.trim();
    let siteUrl = siteUrlInput.value.trim();

    siteNameErrMsg.textContent = "";
    siteUrlErrMsg.textContent = "";

    if (siteName === "") {
        siteNameErrMsg.textContent = "Site name is required.";
    }
    if (siteUrl === "" || !isValidURL(siteUrl)) {
        siteUrlErrMsg.textContent = "Enter a valid URL.";
    }
    if (siteName !== "" && isValidURL(siteUrl)) {
        createListItem(siteName, siteUrl);
        siteNameInput.value = "";
        siteUrlInput.value = "";
    }
}

// Event Listener for Form Submission
bookmarkForm.addEventListener("submit", function (event) {
    event.preventDefault();
    validateAndSubmit();
});
