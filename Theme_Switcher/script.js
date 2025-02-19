let bgContainer = document.getElementById("bgContainer");
let heading = document.getElementById("heading");
let themeUserInput = document.getElementById("themeUserInput");
let themeButton = document.getElementById("themeButton");

// Function to switch theme
function switchTheme(theme) {
    if (theme === "light") {
        bgContainer.style.backgroundImage = "url('https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/change-theme-light-bg.png')";
        heading.style.color = "#014d40";
    } else if (theme === "dark") {
        bgContainer.style.backgroundImage = "url('https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/change-theme-dark-bg.png')";
        heading.style.color = "white";
    } else {
        alert("Enter 'Light' or 'Dark' to switch themes.");
    }
    themeUserInput.value = "";
}

// Handle input submission via Enter key
themeUserInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        switchTheme(themeUserInput.value.trim().toLowerCase());
    }
});

// Handle button click for theme switching
themeButton.addEventListener("click", function () {
    switchTheme(themeUserInput.value.trim().toLowerCase());
});
