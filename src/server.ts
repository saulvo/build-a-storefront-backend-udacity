import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { productRoute } from "./routes";

const app: express.Application = express();
const port = 3000;
const address: string = `http://127.0.0.1:${port}`;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoute(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
