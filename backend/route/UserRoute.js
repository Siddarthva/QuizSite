const express = require("express");
const router = express.Router();
const { signup, login, updatestats, getLeaderboard } = require("../controllers/UserControler");

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-stats/:id", updatestats);
router.get("/leaderboard", getLeaderboard);

module.exports = router;