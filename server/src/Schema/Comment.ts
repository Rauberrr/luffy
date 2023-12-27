import { DataTypes } from 'sequelize'
import sequelize from '../config/database'
import { v4 as uuidv4 } from 'uuid'

const Comment = sequelize.define('comment', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  commentId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Comment
