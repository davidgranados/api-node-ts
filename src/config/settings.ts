import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class Settings {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({ path: nodeNameEnv });
  }

  public getEnv(name: string) {
    return process.env[name];
  }

  public getNumberEnv(name: string) {
    return Number(this.getEnv(name));
  }

  public get nodeEnv(): string {
    return this.getEnv("NODE_ENV")?.trim() ?? "";
  }

  public createPathEnv(path: string): string {
    const arrEnv = ["env"];
    if (path.length > 0) {
      const stringToArray = path.split(".");
      arrEnv.unshift(...stringToArray);
    }
    return `.${arrEnv.join(".")}`;
  }

  public get dataSource(): DataSource {
    return new DataSource({
      type: "postgres",
      host: this.getEnv("DB_HOST")?.trim() ?? "",
      port: this.getNumberEnv("DB_PORT") ?? 5432,
      username: this.getEnv("DB_USER")?.trim() ?? "",
      password: this.getEnv("DB_PASS")?.trim() ?? "",
      database: this.getEnv("DB_NAME")?.trim() ?? "",
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/../migrations/*{.ts,.js}"],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    });
  }
}
