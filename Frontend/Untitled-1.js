// Elementos del DOM
const chatContainer = document.getElementById("chat");
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessage");

let typingTimeout;

// Escuchar eventos
sendMessageButton.addEventListener("click", () => sendMessage('send'));
messageInput.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') sendMessage('send');
});

// Simulación de recepción de mensajes (puedes usar websockets o APIs)
setInterval(() => {
    simulateReceivedMessage("Hola, este es un mensaje recibido.");
}, 5000);

// Función para enviar un mensaje
function sendMessage(type) {
    const message = messageInput.value.trim();
    if (message === '') return;

    addMessageToChat(message, type);
    messageInput.value = ''; // Limpiar el campo de entrada
    scrollToBottom(); // Desplazar hacia el final del chat
}

// Función para agregar un mensaje al chat
function addMessageToChat(content, type) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("msg_cotainer", type); // 'send' o 'rcvd'
    messageElement.textContent = content;
    chatContainer.appendChild(messageElement);
}

// Simular la recepción de mensajes
function simulateReceivedMessage(content) {
    addMessageToChat(content, 'rcvd');
    scrollToBottom();
}

// Función para desplazar el chat hacia el final
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
