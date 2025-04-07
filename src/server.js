const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

const randomEmail = faker.internet.email();
const subject = faker.lorem.sentence();
const emailBody = faker.lorem.paragraph();
const sentDate = faker.date.recent(365);
const randomNumber = faker.number.int( { min: 1, max: 5} );

const receivedDate = faker.date.soon({ 
    days: 7, 
    refDate: sentDate 
});

function generateMessages() {
    let arr = [];
    const numberOfMessages = randomNumber;
    const msg = {
        "id": uuidv4(),
        "from": randomEmail,
        "subject": subject,
        "body": emailBody,
        "received": receivedDate
    };

    for (let index = 0; index < numberOfMessages; index++) {
        arr.push(msg);
    };

    return arr;
}

// Эндпоинт /messages/unread
app.get('/messages/unread', (req, res) => {
    const msgs = {
        "status": "ok",
        "timestamp": sentDate,
        "messages": generateMessages()
    }

    res.send(msgs);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});