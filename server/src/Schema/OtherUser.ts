import { DataTypes } from 'sequelize'
import sequelize from '../../config/database'

const OtherUser = sequelize.define('other', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  postId: {
    type: DataTypes.INTEGER
  },
  user: {
    type: DataTypes.STRING
  },
  likes: {
    type: DataTypes.BOOLEAN
  },
  comment: {
    type: DataTypes.STRING
  }
})

export default OtherUser
