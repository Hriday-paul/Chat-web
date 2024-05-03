const express = require("express");
const { addUser, updateUser, someUsers, serchUser, singleUser, myProfileData } = require("../controler/user");
const { getMessage, addMessage } = require("../controler/message");
const router = express.Router();

// add a new user or update google sign in user
router.put("/addUser", addUser);

//update user 
router.put('/updateUser', updateUser);

//get all users
router.get('/users', someUsers);

//search user
router.get('/searchUsers', serchUser)

//get single user
router.get('/user/:id', singleUser)

//get my info
router.get('/myInfo/:email', myProfileData);

// get message by specifiq friends
router.get('/messages', getMessage);

//connection socket
global.io.on('connection', socket => {

    socket.on('disconnect', () => {
  
    });
  
    socket.on('sendMessage', async (messageInfo, receiverEmail) => {
      socket.broadcast.emit(receiverEmail, messageInfo);
      addMessage(messageInfo);
    });
  });

module.exports = router;