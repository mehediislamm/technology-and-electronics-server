const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

// Technology-and-Electronics
// XHIMfTdOvKjL6hlt


// middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;





// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zjauaf8.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://Technology-and-Electronics:XHIMfTdOvKjL6hlt@cluster0.zjauaf8.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // const usersCollection = client.db("userDB").collection("users");
    const userCollection = client.db('userDB').collection("productsBrand");
    const allCollection = client.db('userDB').collection("allCards");
    const addtoCard = client.db('userDB').collection("addCard");

    // post single data endpoint

    app.post("/productsBrand", async (req, res) => {
      const user = req.body;
      //   console.log(user);
      const result = await userCollection.insertOne(user);
      console.log(result);
      res.send(result);
    });

    // add to card

    app.post("/addCard", async (req, res) => {
      const user = req.body;
      //   console.log(user);
      const result = await addtoCard.insertOne(user);
      console.log(result);
      res.send(result);
    });



    app.get("/addCard", async (req, res) => {
      const id = req.params.id;
      console.log("id", id);

      const result = await addtoCard.find().toArray();
      console.log(result);
      res.send(result);
    });





    // delete single users

    app.delete("/addCard/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete", id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await addtoCard.deleteOne(query);
      console.log(result);
      res.send(result);
    });




    // Read single data endpoint

    app.get("/allCards", async (req, res) => {
      const result = await allCollection.find().toArray();
      res.send(result);
    });

    // Read single data for productsBrand

    app.get("/productsBrand", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });



    //   get single data useing id

    app.get("/productsBrand/:id", async (req, res) => {
      const id = req.params.id;
      console.log("id", id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await userCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // single data using id for allCarda
    app.get("/brand/:brand_name", async (req, res) => {
      const brandName = req.params.brand_name;
      console.log('id', brandName);
      const query = {
        brand_name: brandName,
      };
      const cursor = userCollection.find(query);
      const result = await cursor.toArray()
      console.log(result);
      res.send(result);

    });

    // update Single User 
    app.put("/productsBrand/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      console.log("id", id, data);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedData = {
        $set: {
          image: data.image,
          name: data.name,
          type: data.type,
          price: data.price,
          description: data.description,
          rating: data.rating,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updatedData,
        options
      );
      res.send(result);
    });


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get("/", (req, res) => {
  res.send("Crud is running...");
});


app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`);
});

