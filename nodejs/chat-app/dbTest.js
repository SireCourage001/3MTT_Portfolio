import { MongoClient } from "mongodb";

const uri = "mongodb+srv://sirecourage:fpEXl6zfwPQAzF8b@cluster.ruscyhr.mongodb.net/"; // Replace this
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("chat_app_db"); // Creates DB if it doesn't exist
    const messages = db.collection("messages"); // Creates collection on first insert

    // Insert a sample message
    const result = await messages.insertOne({
      sender: "Courage",
      message: "Hello world!",
      timestamp: new Date()
    });

    console.log("Message inserted:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
