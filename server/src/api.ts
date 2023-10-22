import Config from "./config";
import express from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import ApiResult from "../types/api-result";
import { toDTO } from "../types/tobacco-dto";

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

  const searchQuery = `${req.query.search}`;
  const result: ApiResult = {
    status: 500,
    error: "Search for Tobaccos failed",
    data: null,
  };
  prisma.tobacco
    .findMany({
      where: {
        name: {
          contains: searchQuery,
        },
      },
      include: {
        producer: true,
      },
    })
    .then((tobaccos) => {
      result.data = tobaccos.map((tobacco) => toDTO(tobacco));
      result.error = null;
      result.status = 200;
    })
    .catch((error: Error) => {
      result.error = error.message;
      console.error(error);
    })
    .finally(() => {
      res.status(result.status);
      res.json(result);
    });
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

app.listen(Config.API_PORT, () => {
  console.debug(`API listening on Port ${Config.API_PORT}`);
});
