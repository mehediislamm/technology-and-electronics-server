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
        await client.connect();

        const usersCollection = client.db("userDB").collection("users");

        // post single data endpoint

        app.post("/users", async (req, res) => {
            const user = req.body;
            //   console.log(user);
            const result = await usersCollection.insertOne(user);
            console.log(result);
            res.send(result);
        });

        // Read single data endpoint

        app.get("/users", async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
          });

        //   get single data useing id

        app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            console.log("id", id);
            const query = {
              _id: new ObjectId(id),
            };
            const result = await usersCollection.findOne(query);
            console.log(result);
            res.send(result);
          });

            // update Single User 
            app.put("/users/:id", async (req, res) => {
                const id = req.params.id;
                const data = req.body;
                // console.log("id", id, data);
                const filter = { _id: new ObjectId(id) };
                const options = { upsert: true };
                const updatedData = {
                  $set: {
                    image:data.image,
                    name: data.name,
                    type:data.type,
                    price:data.price,
                    description:data.description,
                    rating:data.rating,
                  },
                };
                const result = await usersCollection.updateOne(
                  filter,
                  updatedData,
                  options
                );
                res.send(result);
              });


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
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

