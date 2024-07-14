const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection_db = require("./db");
const foodItem = require("./models/FoodItemsModel.js");
connection_db();

const app = express();
const port = 3002;

const corsOptions = {
  origin: ["http://localhost:3002", "https://food-hut-chi.vercel.app"],
  optionsSuccessStatus: 200,
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
};

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://food-hut-chi.vercel.app/"); // Update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

app.use(express.json());
app.use(cors());

app.get("/", async(req, res) => {
  res.send("API is running");
  try{
    const item = await foodItem.find();
    res.send(item);
  }
  catch(error)
  { 
    res.json({ success: false });
    console.log("Error is: ", error)
  }
});


app.use("/signup", require("./routes/createuser"), (req, res) => {
  console.log("User faied to create");
});

app.use("/signin", require("./routes/createuser"), (req, res) => {
  console.log("User faied to create");
});

app.use("/food", require("./routes/displaydata"), (req, res) => {
  console.log("Log in falied");
});

app.use("/orderdata", require("./routes/orderdata"), (req, res) => {
  console.log("Order data failed");
});

app.use("/orderdata", require("./routes/orderdata"), (req, res) => {
  console.log("Order data failed");
});

app.use("/contact", require("./routes/contact"), (req, res) => {
  console.log("Order data failed");
});

app.post("/test", (req, res) => {
  console.log("POST request received at /test");
  res.send("POST request to /test successful");
});

// ----------------------------------------------------------
//  router for food items and category
app.use("/getfood", require("./routes/food"), (req, res) => {
  console.log("get food failed");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
