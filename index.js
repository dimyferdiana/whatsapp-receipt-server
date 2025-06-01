const express = require('express');
const app = express();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.use(express.json());

// GET /webhook for WhatsApp webhook verification
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    }
    res.sendStatus(400);
});

// POST /webhook for receiving WhatsApp messages
app.post('/webhook', (req, res) => {
    console.log('Received webhook:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server is listening...');
});
