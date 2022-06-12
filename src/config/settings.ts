import * as dotenv from "dotenv";

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
}
