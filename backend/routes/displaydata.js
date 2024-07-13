const express = require("express");
const router = express.Router();

router.post("/fooditems", (req, res) => {
  try {
    res.send([global.food_items, global.food_category])
    res.json({ success: false })
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
    res.json({ success: false });
  }
});

module.exports = router;
