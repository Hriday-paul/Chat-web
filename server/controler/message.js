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

        // get message
        const result = await messageList.find(query).sort({ time: -1 }).limit(limit);

        // get messages length
        const totalMessage = await messageList.countDocuments(query);
        const hasMore = (totalMessage-limit > 0) ? true : false;
        
        res.send({messages : result, hasMore})
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