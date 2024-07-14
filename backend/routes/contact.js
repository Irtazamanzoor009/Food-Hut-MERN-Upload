const express = require("express");
const router = express.Router();
const contact = require("../models/contactmodel.js");

router.post("/contactus", async (req, res) => {

  try {
    await contact.create({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      subject: req.body.subject,
      message: req.body.message,
    });
    res.json({ success: true });
  } catch (error) {
    console.log("error in using schema", error);
    res.json({ success: false });
  }
});

router.get("/getcontact",async(req,res)=>{
  try{
    const getcontact = await contact.find();
    res.json(getcontact);
  }
  catch(error)
  { 
    res.json({ success: false });
    console.log("Error is: ", error)
  }
})



module.exports = router;
