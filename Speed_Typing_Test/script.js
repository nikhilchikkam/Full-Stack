let speedTypingTest = document.getElementById("speedTypingTest");
let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let seconds = document.getElementById("seconds");
let intervalId;
let spinner = document.getElementById("spinner");

let url = "https://apis.ccbp.in/random-quote";

function onLoad(url){
    fetch(url).then(function(resposne) {
        return resposne.json();
    }).then(function(result) {
        spinner.classList.toggle("d-none");
        quoteDisplay.textContent = result.content;
        console.log(quoteDisplay.textContent);
        intervalId = setInterval(function() {
            let sec = parseInt(seconds.textContent);
            sec += 1;
            seconds.textContent = sec;
        }, 1000);
    });
}

spinner.classList.toggle("d-none");
onLoad(url);

submitBtn.addEventListener("click", function(event) {
    if (quoteInput.value === quoteDisplay.textContent) {
        clearInterval(intervalId);
        result.textContent = `You typed in ${seconds.textContent} seconds.`;
    } else {
        result.textContent = `You typed incorrect sentence.`;
    }
});

resetBtn.addEventListener("click", function(){
    quoteDisplay.textContent = "";
    quoteInput.value = "";
    seconds.textContent = 0;
    spinner.classList.toggle("d-none");
    result.textContent = "";
    clearInterval(intervalId);
    onLoad(url);
})