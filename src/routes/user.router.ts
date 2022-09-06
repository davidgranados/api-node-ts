import { BaseRouter } from './router'
import { UserController } from '../controllers/user.controller'

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes() {
    this.router.get("/users", this.controller.getUsers);
  }
}
