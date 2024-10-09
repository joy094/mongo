const express = require("express");

const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.listen(port, async () => {
  console.log("server is live ");
  db();
});

//
//   .then(() => {
//     console.log("db is connecrted");
//   })
//   .catch((error) => {
//     console.log("db is not connected");

//     console.log(error);
//   });
// mongoose;
//   .connect("mongodb://localhost:27017/PRACTIC")
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
  const createData = new productModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const saveDatabase = await createData.save();
  res.send(saveDatabase);
});

const productSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdTime: {
    type: Date,
    default: Date.now,
  },
});
const productModel = mongoose.model("myDB_practice", productSchema);

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/PRACTIC");
    console.log("MONGO_DB IS connect");
  } catch (error) {
    console.log("db not connect");
    console.log(error);
  }
};
