import { DataTypes, type Model } from 'sequelize'
import sequelize from '../config/database'
import { v4 as uuidv4 } from 'uuid'

interface userProps extends Model {
  userId: string
  name: string
  email: string
  password: string
  img?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
}

const User = sequelize.define<userProps>('user', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(10),
    allowNull: false

  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false

  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: false

  },
  img: {
    type: DataTypes.JSONB
  }
})

export default User
