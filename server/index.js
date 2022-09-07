const express = require('express');
const app = express();
const port = process.env.PORT || 8001;
const cors = require('cors');
app.use(cors());
app.use(express.json()); //req.body



app.listen(port, () => {
console.log(`The app is running on port ${port}.`);
});
