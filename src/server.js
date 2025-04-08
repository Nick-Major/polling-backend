const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Генерация сообщений
function generateMessages() {
    const randomNumber = faker.number.int({ min: 1, max: 3 });
    let arr = [];
    
    for (let index = 0; index < randomNumber; index++) {
        arr.push({
            "id": uuidv4(),
            "from": faker.internet.email(),  // Генерируем новый email для каждого сообщения
            "subject": faker.lorem.sentence(),
            "body": faker.lorem.paragraph(),
            "received": faker.date.recent(7).getTime() / 1000  // Unix timestamp в секундах
        });
    }
    return arr;
}

app.get('/messages/unread', (req, res) => {
    const response = {
        "status": "ok",
        "timestamp": Math.floor(Date.now() / 1000),  // Текущий Unix timestamp в секундах
        "messages": generateMessages()
    };
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});