import { DataTypes } from 'sequelize'
import sequelize from '../../config/database'

const Comments = sequelize.define('comment', {
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
    type: DataTypes.INTEGER
  },
  comment: {
    type: DataTypes.STRING
  }
})

export default Comments
