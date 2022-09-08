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

//Delete an item
app.delete("/items/delete/:id", async (req, res) => {
  try {
   const id = parseInt(req.params.id);
   console.log("Backend message - Deleted item id:", id);
   const deleteStep = await pool.query(
     "DELETE FROM users WHERE user_id = $1 RETURNING *", [id]
   )
   res.json("Network Response: The item was deleted")
  } catch (err) {
    console.error(err.message)
  }
})

//Add an item
app.post("/items", async (req, res) => {
  try {
    const {user_name, user_email, user_password, user_is_administrator} = req.body;
    console.log("req body", req.body)
   const newItem = await pool.query("INSERT INTO users    (user_name, user_email, user_password, user_is_administrator) VALUES($1, $2, $3, $4) RETURNING *", [user_name, user_email, user_password, user_is_administrator])
    res.json(newItem.rows[0])
  } catch (err) {
console.error(err.message)
  }
})

//Edit an item
app.put("/items/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`The item with id ${id} has been updated`)
    const {
      user_name, user_email, user_password, user_is_administrator} = req.body
      const editItem = await pool.query('UPDATE users SET user_name = $1, user_email = $2, user_password = $3, user_is_administrator = $4 WHERE user_id = $5', [user_name, user_email, user_password, user_is_administrator, id])
      res.json("Network response: the item was updated")
    } catch (err) {
      console.error(err.message)
    }
})


app.listen(port, () => {
console.log(`The app is running on port ${port}.`);
});
