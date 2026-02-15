const express = require("express");
const router = express.Router();
const { signup, login,updatestats } = require("../controllers/UserControler");

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-stats/:id",updatestats);

module.exports = router;