const express = require('express')
const userInfo = require('../server/model')
const router = express.Router()

router.post("/", async (req, res) => {
  const userData = await userInfo.create(req.body);
  res.status(200).json({ message: "created user Data", data: userData });
});

router.get("/", async(req, res)=>{

  const allP = await userInfo.find()
  res.status(201).json({messag:"data", data:allP})
})

router.delete("/:id", async(req, res)=>{
   const deleteUser = await userInfo.findByIdAndDelete(req.params.id, req.body)
   res.status(200).json({ message:"deleted suxesfully"})
})

module.exports = router