const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@chatcluster1.qlgv4is.mongodb.net/?retryWrites=true&w=majority`, {
      dbName : 'users'
    });
    console.log(`DB Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
    process.exit(1);
  }
};

module.exports = connectDb;
