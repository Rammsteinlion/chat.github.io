const chatContainer = document.getElementById("chat");
const messageInput = document.getElementById("inputMessage");
const sendMessageButton = document.getElementById("sendMessage");
const activeUser = document.querySelector(".active_user");
const typingIndicator = document.querySelector(".bubble-typing");

let typingTimeout;
let imageStash = null;

activeUser.classList.add("inactive");

sendMessageButton.addEventListener("click", () => sendMessage("send"));
messageInput.addEventListener("keydown", (event) => {
    
    if(event.target.value !=''){
      showTyping();
    }else if(event.target.value === ''){
      hideTyping();
    }
    resetTypingTimeout();
  if (event.key === "Enter") sendMessage("send");
});

// Simulación de recepción de mensajes (puedes usar websockets o APIs)
setInterval(() => {
  //  simulateReceivedMessage("Hola, este es un mensaje recibido.");
}, 5000);

function sendMessage(type) {
  const message = messageInput.value.trim(); // Obtener el texto del input
  if (message === "" && !imageStash) return; // Si no hay texto ni imagen, no hacer nada

  let content = {};

  // Si hay una imagen en el stash y texto en el input
  if (imageStash && message) {
    content.image = imageStash; // Asignar la imagen
    content.text = message; // Asignar el texto
    imageStash = null; // Limpiar el stash de la imagen
    addMessageToChat(content, "send"); // Enviar ambos (imagen y texto)
  }
  // Si solo hay imagen
  else if (imageStash) {
    content.image = imageStash; // Asignar solo la imagen
    content.text = ""; // No hay texto
    addMessageToChat(content, "send"); // Enviar solo la imagen
    imageStash = null; // Limpiar el stash de la imagen
  }
  // Si solo hay texto
  else if (message) {
    content.image = ""; // No hay imagen
    content.text = message; // Asignar solo el texto
    addMessageToChat(content, type); // Enviar solo el texto
  }

  messageInput.value = "";
  scrollToBottom();
}

// Reinicia el temporizador al escribir
function resetTypingTimeout() {
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    hideTyping();
  }, 1000); 
}


function showTyping() {
  typingIndicator.classList.remove("hidden");
}

function  hideTyping() {
  typingIndicator.classList.add("hidden");
}

function addMessageToChat(content, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("msg_cotainer", type);

  // Si hay imagen, agregarla
  if (content.image && content.image.startsWith("data:image")) {
    const imgElement = document.createElement("img");
    imgElement.src = content.image;
    imgElement.classList.add("message-image");
    messageElement.appendChild(imgElement);
  }

  // Si hay texto, agregarlo debajo de la imagen (si existe)
  if (content.text && content.text.trim() !== "") {
    const textElement = document.createElement("span");
    textElement.textContent = content.text;
    messageElement.appendChild(textElement);
  }

  // Agregar el mensaje al contenedor de chat
  chatContainer.appendChild(messageElement);
  cancelImage(); // Limpiar la previsualización de la imagen si es necesario
}

// Simular la recepción de mensajes
function simulateReceivedMessage(content) {
  addMessageToChat(content, "rcvd");
  scrollToBottom();
}

// Función para desplazar el chat hacia el final
function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

//Funcion para cargar imagenes
const imagePreviewContainer = document.querySelector("#imagePreviewContainer");
const imagePreview = document.getElementById("imagePreview");
const cancelPreview = document.getElementById("cancelPreview");

document.querySelector("input[type=file]").onchange = function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    imagePreview.src = e.target.result;
    imageStash = e.target.result;
    imagePreviewContainer.style.display = "block";
  };

  reader.readAsDataURL(file);
};

cancelPreview.addEventListener("click", () => cancelImage());

function cancelImage() {
  imagePreviewContainer.style.display = "none";
  imagePreview.src = "";
  imageStash = null;
}
