require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { Tobacco } = require("../models/tobacco");
const { TobaccoDto } = require("./types/tobacco-dto");

const swaggerUI = require("swagger-ui-express");
// Generated with // https://editor.swagger.io/
const openAPI = require("./openapi.json");
const openAPIOptions = require("./openapi-options.json");

const port = process.env.PORT || process.env.API_PORT;
const dbOptions = {
  user: process.env.DB_USER,
  pass: process.env.DB_PW,
};

mongoose.connect(process.env.DB_CONNECTION, dbOptions, (error) => {
  if (error) console.error(error);
  else console.debug("DB connected!");
});

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(openAPI, openAPIOptions));

app.get("/api", (req, res) => {
  res.json({
    version: process.env.API_VERSION,
  });
});

app.get("/api/tobaccos", (req, res) => {
  if (!req.query || !req.query.search) {
    res.json([]);
    return;
  }

  const findOptions = { $or: [] };
  const searchParameter = req.query.search;
  const nameOption = { name: { $regex: `${searchParameter}`, $options: "i" } };
  findOptions.$or.push(nameOption);
  const producerNameOption = {
    "producer.name": { $regex: `${searchParameter}`, $options: "i" },
  };
  findOptions.$or.push(producerNameOption);
  const tasteOption = {
    tastes: { $elemMatch: { $regex: `${searchParameter}`, $options: "i" } },
  };
  findOptions.$or.push(tasteOption);

  Tobacco.find(findOptions, (err, data) => {
    if (err) {
      console.error(err);
      res.json([]);
      return;
    }

    const tobaccos = data.map((tobaccoFromDb) => new TobaccoDto(tobaccoFromDb));
    res.json(tobaccos);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.debug(`API listening on Port ${port}`);
});
