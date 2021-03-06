const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorization
router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("User does not exist");
    }
    else {
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      const {user_id, first_name, last_name, email} = user.rows[0];
      return res.json({ user_id, first_name, last_name, email, jwtToken });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
