document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const deleteAllButton = document.getElementById('delete-all-button');
    const MESSAGES_KEY = 'chat_messages';

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
        messages.forEach((msg, index) => appendMessage(msg.text, msg.user, index));
    }

    function saveMessage(text, user) {
        const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
        messages.push({ text, user });
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    }

    function deleteMessage(index) {
        let messages = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
        messages.splice(index, 1);
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
        renderMessages();
    }

    function deleteAllMessages() {
        localStorage.removeItem(MESSAGES_KEY);
        renderMessages();
    }

    function appendMessage(text, user = false, index = null) {
        const message = document.createElement('div');
        message.classList.add('message');
        if (user) {
            message.classList.add('user');
        } else {
            message.classList.add('bot');
        }

        const messageText = document.createElement('span');
        messageText.textContent = text;
        message.appendChild(messageText);

        if (index !== null) {
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteMessage(index);
            message.appendChild(deleteButton);
        }

        chatWindow.appendChild(message);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            appendMessage(messageText, true);
            saveMessage(messageText, true);
            chatInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botResponse = 'Bot: ' + messageText;
                appendMessage(botResponse, false);
                saveMessage(botResponse, false);
            }, 500);
        }
    }

    function renderMessages() {
        chatWindow.innerHTML = '';
        loadMessages();
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    deleteAllButton.addEventListener('click', deleteAllMessages);

    renderMessages();
});
