let chatbotMsgList = ["Hi", "Hey", "Good Morning", "Good Evening", "How can I help you?", "Thank You"];

let chatContainer = document.getElementById("chatContainer");
let sendMsgBtn = document.getElementById("sendMsgBtn");
let userInput = document.getElementById("userInput");
let index = 0;

function botReply(i) {
    let replyContainer = document.createElement("div");
    replyContainer.classList.add("msg-from-chatbot-container");

    let reply = document.createElement("span");
    reply.classList.add("msg-from-chatbot");
    reply.textContent = chatbotMsgList[i];

    replyContainer.appendChild(reply);
    chatContainer.appendChild(replyContainer);

    // Scroll to the latest message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendMessage() {
    let userMessage = userInput.value.trim();
    if (userMessage === "") return;

    let msgContainer = document.createElement("div");
    msgContainer.classList.add("msg-to-chatbot-container");

    let message = document.createElement("span");
    message.classList.add("msg-to-chatbot");
    message.textContent = userMessage;

    msgContainer.appendChild(message);
    chatContainer.appendChild(msgContainer);

    // Bot replies after a short delay for better UX
    setTimeout(() => {
        botReply(index);
        index = (index + 1) % chatbotMsgList.length; // Loop through responses
    }, 500);

    userInput.value = "";
    userInput.focus(); // Keeps focus for quicker chatting

    // Scroll to the latest message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Attach event listener for button click
sendMsgBtn.addEventListener("click", sendMessage);

// Allow sending messages using the Enter key
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
