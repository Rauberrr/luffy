import { DataTypes } from 'sequelize'
import sequelize from '../../config/database'

const Comment = sequelize.define('comment', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Comment
