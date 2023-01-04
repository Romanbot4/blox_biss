const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const db = require("./database");

try {
  db.sequelize.authenticate();
  db.sequelize.sync();
  
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(require("./routes"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
