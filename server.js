const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));

// sync DB

const db = require("./app/models");

db.sequelize.sync();

// routes

app.get("/", (req, res) => {
  res.json({ message: "Public Content" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/group.routes')(app);
require('./app/routes/issue.routes')(app);
require('./app/routes/skill.routes')(app);
require('./app/routes/call.routes')(app);
require('./app/routes/message.routes')(app);

// set port, listen for requests

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
