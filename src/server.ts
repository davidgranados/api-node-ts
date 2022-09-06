import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { UserRouter } from './routes/user.router'
import { Settings } from './config/settings'

class ServerBootstrap extends Settings {
  public app: express.Application = express()
  private port: number = this.getNumberEnv('PORT')

  constructor() {
    super()

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use('/api/', this.routers())

    this.dbConnect()
      .then(() => {
        console.log('Data Source has been initialized!')
        this.listen()
      })
      .catch((err) => {
        console.error('Error during Data Source initialization:', err)
      })
  }

  routers(): Array<express.Router> {
    return [new UserRouter().router]
  }

  async dbConnect() {
    return this.dataSource.initialize()
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

new ServerBootstrap()
