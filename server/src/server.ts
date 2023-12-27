import App from './App'
import dotenv from 'dotenv'

dotenv.config()

const app = new App()

if (process.env.PORT != null) {
  app.list(parseInt(process.env.PORT))
} else {
  app.list(9001)
}
