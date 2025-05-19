const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// middle ware
app.use(express.json());
app.use(cors());

//xrlw4BRPvZykenjH
//data-collection
const dbName = process.env.DB_USER_NAME;
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbName}:${dbPassword}@userdatabase.06ovt0z.mongodb.net/?retryWrites=true&w=majority&appName=userDatabase`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
