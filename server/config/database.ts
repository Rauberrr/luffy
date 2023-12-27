import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const database: string = process.env.DATABASE

const sequelize = new Sequelize(database)

export default sequelize
