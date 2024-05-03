const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const http = require('http');
const serverio = require('socket.io');
const connectDb = require("./config/connectDb");
dotenv.config();
const PORT = process.env.PORT;

//databse call
connectDb();

// midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const server = http.createServer(app);

app.use(cors())

const io = serverio(server, {
  cors: {
      origin: ["http://localhost:5173", 'https://message-friend.netlify.app'],
      methods: ["GET", "POST"]
  }
});

global.io = io;


app.get('/test', async (req, res) => {
  const start = parseInt(req.query.start);
  const end = parseInt(req.query.end);
  const data = [];

  for (let i = start; i < (start + end); i++) {
    data.push(i)
  }
  res.send(data);
})

//user routes
app.use("/api", require("./routs/rout"));

//api not found error
app.use((req, res) => {
  res.send({
    status: false,
    message: "Api rout not found",
    error: "not found"
  })
});

// error handleing
app.use((err, req, res) => {
  res.send({
    status: false,
    message: "Got server error",
    error: err.message
  })
});


//listen server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
