import express from "express";
import morgan from "morgan";
import cors from "cors";

class ServerBootstrap {
  public app: express.Application = express();
  private port: number = 8009;

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.get("/api/hola", (req, res) => {
      res.status(200).json({ message: "hola bro" });
    });

    this.listen();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

new ServerBootstrap();
