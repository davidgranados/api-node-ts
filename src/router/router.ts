import { Router } from "express";

export class BaseRouter<TController> {
  public router: Router;
  public controller: TController;
  // public middleware

  constructor(controller: { new (): TController }) {
    this.router = Router();
    this.controller = new controller();
    this.routes();
  }

  routes(){}
}
