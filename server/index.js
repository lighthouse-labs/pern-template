const express = require('express');
const app = express();
const port = process.env.PORT || 8001;
const cors = require('cors');
app.use(cors());
app.use(express.json()); //req.body
const pool = require("./db")

//Routes and queries

//Get all items

app.get("/items", async (req, res) => {
  try {
    const getAllItems = await pool.query(
    'SELECT * FROM users'
    );
    res.json(getAllItems.rows)
  } catch (err) {
    console.error(err.message)
  }
});


app.listen(port, () => {
console.log(`The app is running on port ${port}.`);
});
