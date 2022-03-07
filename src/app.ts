import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import xmlBodyParser from "body-parser-xml";
import cors from "cors";
import dotenv from "dotenv";

let env = process.argv[2] || "dev";
switch (env) {
    case "dev":
        dotenv.config({ path: "./.env" });
        break;
}

const app = express();

xmlBodyParser(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.xml());

app.set("port", Number(process.env.APPLICATION_PORT || 8080));

app.use(cors({ origin: "*" }));
app.use(cors({ origin: "*" }));

export default app;