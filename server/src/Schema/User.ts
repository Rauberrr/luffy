import { DataTypes } from 'sequelize'
import sequelize from '../../config/database'

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(10)
  },
  email: {
    type: DataTypes.STRING(30)
  },
  password: {
    type: DataTypes.STRING(30)
  }
})

export default User
