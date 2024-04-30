const userList = require('./../model/users');



// add a new user
const addUser = async (req, res) => {
    try {
        const filter = { email: req.body.email };
        const options = { upsert: true };
        const updateDoc = {
            $set: req.body
        };
        const result = await userList.updateOne(filter, updateDoc, options);
        res.status(200).send(result);
    } catch (err) {
        console.log(err.message);
        res.status(402).send({ err : err.message })
    }
};

// update a user
const updateUser = async (req, res) => {
    try {
        const filter = { email: req.body.email };
        const updateDoc = {
            $set: req.body
        };
        const result = await userList.updateOne(filter, updateDoc);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(402).send({ err })
    }
}

// get some users
const someUsers = async (req, res) => {
    try {
        const dataCount = parseInt(req.query.dataCount)
        const my = req.query.i;
        const users = await userList.find({email : {$ne : my}}).select('-password').limit(dataCount)
        const totalUsers = await userList.estimatedDocumentCount();
        const hasMore = (totalUsers-dataCount > 0) ? true : false;
        res.status(200).send({friends : users, hasMore});
    }
    catch (err) {
        res.status(402).send({ err : err.message })
    }
}

// find user
const serchUser = async (req, res) => {
    try {
        const query = {
            name: {
                $regex: req.params.searchTxt,
                $options: 'i'
            }
        }
        const users = await userList.find(query).select('-password');
        res.status(200).send(users);
    }
    catch (err) {
        res.status(402).send({ err })
    }
}

// single user
const singleUser = async (req, res) => {
    try {
        const query = { _id: req.params.id }
        const users = await userList.findOne(query).select('-password')
        res.status(200).send(users);
    }
    catch (err) {
        res.status(402).send({ err : err.message })
    }
}

//get my profile info with email
const myProfileData = async (req, res) => {
    try {
        const query = { email: req.params.email }
        const users = await userList.findOne(query)
        res.status(200).send(users);
    }
    catch (err) {
        res.status(402).send({ err })
    }
}

module.exports = {
    addUser,
    updateUser,
    someUsers,
    serchUser,
    singleUser,
    myProfileData
}