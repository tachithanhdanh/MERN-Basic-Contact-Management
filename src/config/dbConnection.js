const mongoose = require('mongoose');

const uri = process.env.CONNECTION_STRING;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDb() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    const connect = await mongoose.connect(uri, clientOptions);
    console.log(`MongoDB connected: ${connect.connection.host} ${connect.connection.name}`);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDb;