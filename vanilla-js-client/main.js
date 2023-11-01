import './style.css'
import { createChatMessageEl, createMessageIdPair } from "./utils.js"

let msgId;

const eventSource = new EventSource('http://127.0.0.1:8000/stream')

eventSource.addEventListener("message", (event) => {
  const aiResponseEl = document.getElementById(msgId.aiMsgId);
  aiResponseEl.style = ''
  aiResponseEl.innerHTML += `${event.data}`
})

const formEl = document.getElementById("chatInputForm");
const chatLogEl = document.getElementsByClassName("chatLog")[0];

formEl.addEventListener("submit", async function(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const userMessage = formData.get("userMessage");
  document.getElementById("userMessage").value = "";

  msgId = createMessageIdPair();
  const userMessageEl = createChatMessageEl(msgId.userMsgId)
  userMessageEl.innerHTML = userMessage;
  chatLogEl.appendChild(userMessageEl);

  const result = await fetch('http://127.0.0.1:8000/stream', {
    method: 'POST',
    headers: {
      'Accept': 'text',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message: userMessage})
  })
  if (result.ok) {
    const aiResponseEl = createChatMessageEl(msgId.aiMsgId, true);
    chatLogEl.appendChild(aiResponseEl);
  }
})

