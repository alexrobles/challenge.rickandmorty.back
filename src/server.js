const cors = require('cors');
const express = require('express');
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const myMiddleware = (req, res, next) => {
    if(req?.headers.authorization === 'Bearer ') {
      res.send('Hello, World!');
    }
    next();
  };
app.use(express.json());
app.use(cors());
app.use(myMiddleware); // Using the middleware
app.options("*", cors());

app.use("/api/rickandmorty",require("./routes/rickandmortyapi"));



app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;