import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { orderRouter, productRoute, userRoute } from "./handlers";

const app: express.Application = express();
const port = 3000;
const address: string = `http://127.0.0.1:${port}`;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoute(app);
orderRouter(app);
userRoute(app);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
