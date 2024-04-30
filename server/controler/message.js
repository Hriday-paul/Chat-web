const messageList = require('../model/message');

const getMessage = async (req, res) => {
    try {
        const limit = req.query.limit;
        const query = {
            $or: [
                { 'sender.email': req.query.m, 'receiver.email': req.query.f },
                { 'receiver.email': req.query.m, 'sender.email': req.query.f },
            ]
        }

        const result = await messageList.find(query).sort({ time: 1 })
        res.send(result)
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
}

const addMessage = (msg) => {
    try {
        messageList.collection.insertOne(msg);
    }
    catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    getMessage,
    addMessage
}