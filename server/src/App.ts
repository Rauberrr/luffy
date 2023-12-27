import e, { type Application } from 'express'
import cors from 'cors'
import routes from './routes'
import sequelize from '../config/database'
import bodyParser from 'body-parser'

export default class App {
  public app: Application

  constructor () {
    this.app = e()

    this.middlewares()
    this.router()
    this.db()
  }

  public list (port: number): void {
    this.app.listen(port, () => {
      console.log('app rodando na url: http://localhost:' + port)
    })
  }

  private middlewares (): void {
    this.app.use(e.json())
    this.app.use(e.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    this.app.use(cors())
  }

  private router (): void {
    this.app.use(routes)
  }

  private async db (): Promise<void> {
    try {
      await sequelize.sync()

      console.log('Modelos sincronizados com o banco de dados.')
    } catch (error) {
      console.error('Erro ao sincronizar modelos:', error)
    }
  }
}
