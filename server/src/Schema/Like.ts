import { DataTypes } from 'sequelize'
import sequelize from '../config/database'

const Like = sequelize.define('like', {
  postId: {
    type: DataTypes.UUID
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commentId: {
    type: DataTypes.UUID
  }
})

export default Like
