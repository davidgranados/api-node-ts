import { Router } from "express";

export class BaseRouter<TController> {
  public router: Router;
  public controller: TController;
  // public middleware

  constructor(Controller: { new (): TController }) {
    this.router = Router();
    this.controller = new Controller();
    this.routes();
  }

  routes(){}
}
