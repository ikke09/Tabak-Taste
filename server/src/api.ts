import Config from "./config";
import express, { Express } from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, "../../client/build")));

if (Config.NODE_ENV === "development") {
  const swaggerUI = require("swagger-ui-express");
  // Generated with // https://editor.swagger.io/
  const openAPI = require("../resources/openapi.json");
  const openAPIOptions = require("../resources/openapi-options.json");
  app.use(
    "/api/docs",
    swaggerUI.serve,
    swaggerUI.setup(openAPI, openAPIOptions)
  );
}

app.get("/api", (req, res) => {
  res.json({
    version: Config.API_VERSION,
  });
});

app.get("/api/tobaccos", (req, res) => {
  if (!req.query || !req.query.search) {
    res.json([]);
    return;
  }

  // const findOptions = { $or: [] };
  // const searchParameter = req.query.search;
  // const nameOption = { name: { $regex: `${searchParameter}`, $options: "i" } };
  // findOptions.$or.push(nameOption);
  // const producerNameOption = {
  //   "producer.name": { $regex: `${searchParameter}`, $options: "i" },
  // };
  // findOptions.$or.push(producerNameOption);
  // const tasteOption = {
  //   tastes: { $elemMatch: { $regex: `${searchParameter}`, $options: "i" } },
  // };
  // findOptions.$or.push(tasteOption);

  // Tobacco.find(findOptions, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     res.json([]);
  //     return;
  //   }

  //   const tobaccos = data.map((tobaccoFromDb) => new TobaccoDto(tobaccoFromDb));
  //   res.json(tobaccos);
  // });
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

app.listen(Config.API_PORT, () => {
  console.debug(`API listening on Port ${Config.API_PORT}`);
});
