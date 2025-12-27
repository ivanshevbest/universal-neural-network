function  sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Добавляем сообщение пользователя в чат
    addChatMessage('user-message', userInput);

    // Отправляем запрос на сервер для получения ответа нейросети
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.answer;
        addChatMessage('bot-message', botResponse);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        addChatMessage('bot-message', 'Произошла ошибка при получении ответа.');
    });

    // Очищаем поле ввода
    document.getElementById('user-input').value = '';
}

function addChatMessage(type, message) {
    const chatHistory = document.getElementById('chat-history');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', type);
    messageDiv.textContent = message;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

