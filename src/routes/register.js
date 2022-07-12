const express = require("express");
const register = require("../controllers/registerController");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const data = await req.body;
  register(data, res, next);
});

// router.post("/", register);
module.exports = router;