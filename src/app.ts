import dotenv from "dotenv";
let env = process.argv[2] || "dev";
switch (env) {
    case "dev":
        dotenv.config({ path: "./.env" });
        break;
}
import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    "@services": `${__dirname}/services`,
    "@dto": `${__dirname}/dto`,
    "@module": `${__dirname}/module`,
    "@utils": `${__dirname}/utils`,
    "@middlewares": `${__dirname}/middlewares`,
});
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import xmlBodyParser from "body-parser-xml";
import cors from "cors";

import { routes } from "./routes";

const app = express();

xmlBodyParser(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.xml());

app.set("port", Number(process.env.APPLICATION_PORT || 8080));

app.use(cors({ origin: "*" }));
app.use(cors({ origin: "*" }));
routes(app);
export default app;