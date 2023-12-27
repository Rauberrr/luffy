import { DataTypes } from 'sequelize'
import sequelize from '../../config/database'
import { v4 as uuidv4 } from 'uuid'

const User = sequelize.define('user', {
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
    type: DataTypes.BLOB('long')
  }
})

export default User
