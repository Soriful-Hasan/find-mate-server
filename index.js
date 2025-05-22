const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// middle ware
app.use(express.json());
app.use(cors());

const dbName = process.env.DB_USER_NAME;
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbName}:${dbPassword}@userdatabase.06ovt0z.mongodb.net/?retryWrites=true&w=majority&appName=userDatabase`;

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
    const roommateCollection = client
      .db("data-collection")
      .collection("RoommateCollection");
    const likeCollection = client
      .db("data-collection")
      .collection("likeCollection");

    app.get("/roommateData", async (req, res) => {
      const cursor = await roommateCollection.find().limit(6).toArray();
      res.send(cursor);
    });

    app.get("/listingData", async (req, res) => {
      const cursor = await roommateCollection.find().toArray();
      res.send(cursor);
    });

    app.get("/roommateData/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log(id);
      const cursor = await roommateCollection.find(query).toArray();
      res.send(cursor);
    });

    app.get("/findMyEmail/:email", async (req, res) => {
      const email = req.params.email;
      const query = await roommateCollection.find({ email: email }).toArray();
      res.send(query);
    });

    app.get("/availableData", async (req, res) => {
      const query = await roommateCollection
        .find({ availability: "Available" })
        .toArray();
      res.send(query);
    });

    app.post("/addRoommate", async (req, res) => {
      const {
        title,
        roomType,
        name,
        email,
        contact,
        amount,
        Location,
        description,
        availability,
        lifestyle,
        userPhoto,
      } = req.body;
      const data = [
        {
          title,
          roomType,
          name,
          email,
          contact,
          amount,
          Location,
          description,
          availability,
          userPhoto,
          lifestyle,
        },
      ];
      const result = await roommateCollection.insertMany(data);
      res.send(result);
    });

    app.patch("/addLike/:id", async (req, res) => {
      const id = req.params.id;
      const { like } = req.body;

      const filterId = { _id: new ObjectId(id) };
      const previousData = await roommateCollection.findOne(filterId);

      const prevLike = parseInt(previousData?.like) || 0;
      const newLike = parseInt(like) || 0;
      console.log("new", newLike, "prevLIke", prevLike);
      const updatedLike = prevLike + newLike;
      console.log("updated like", updatedLike);

      const updateLike = {
        $set: {
          like: updatedLike,
        },
      };
      const result = await roommateCollection.updateOne(filterId, updateLike);

      res.send(result);
    });

    app.put("/update/:id", async (req, res) => {
      const {
        title,
        roomType,
        contact,
        amount,
        Location,
        description,
        availability,
        lifestyle,
      } = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          title,
          roomType,

          contact,
          amount,
          Location,
          description,
          availability,
          lifestyle,
        },
      };
      const result = await roommateCollection.updateMany(query, updateDoc);
      res.send(result);
    });

    app.delete("/deleteList/:id", (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = roommateCollection.deleteOne(query);
      res.send(result);
    });

    // others collection code

    app.put("/userLiked/:id", async (req, res) => {
      const id = req.params.id;
      const userId = req.body;
      console.log(userId);
      const query = { _id: new ObjectId(id) };
      const userIsLike = {
        $set: {
          userLogId: userId,
        },
      };
      const result = await likeCollection.updateOne(query, userIsLike, {
        upsert: true,
      });
      res.send(result);
    });

    app.get("/userLogId", async (req, res) => {
      const result = await likeCollection.find().toArray();
      res.send(result);
    });

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
