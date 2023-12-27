import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

let sequelize: Sequelize

if (process.env.DATABASE != null) {
  sequelize = new Sequelize(process.env.DATABASE)
} else {
  throw new Error('Variável de ambiente DATABASE não definida')
}

export default sequelize
