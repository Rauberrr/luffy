import e, { type Request, type Application, type Response, type NextFunction } from 'express'
import cors from 'cors'
import routes from './routes'
import sequelize from './config/database'
import bodyParser from 'body-parser'
import User from './Schema/User'
import Like from './Schema/Like'
import Comment from './Schema/Comment'
import path from 'path'

export default class App {
  public app: Application

  constructor () {
    this.app = e()

    this.middlewares()
    this.router()
    void this.db()
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
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
      res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization')
      this.app.use(cors())
      next()
    })
    this.app.use('/images', e.static(path.join(__dirname, '..', 'imgs')))
  }

  private router (): void {
    this.app.use(routes)
  }

  private async db (): Promise<void> {
    try {
      const response = Promise.all([
        await sequelize.sync({ force: true }),
        await User.sync({ force: true }),
        await Like.sync({ force: true }),
        await Comment.sync({ force: true })
      ])

      console.log(response)
      console.log('Modelos sincronizados com o banco de dados.')
    } catch (error) {
      console.error('Erro ao sincronizar modelos:', error)
    }
  }
}
