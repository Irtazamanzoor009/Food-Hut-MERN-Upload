const express = require("express");
const router = express.Router();

router.post("/fooditems", (req, res) => {
  try {
    res.json([global.food_items, global.food_category])
    res.send("Data Fetched or not")
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
