import { DataTypes } from 'sequelize'
import sequelize from '../../config/database'
import Like from './Like'
import Comment from './Comment'
// import User from './User'
import { v4 as uuidv4 } from 'uuid'

const Posts = sequelize.define('post', {
  postId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

// User.hasMany(Posts)
Posts.hasMany(Like)
Posts.hasMany(Comment)
Like.belongsTo(Posts)
Comment.belongsTo(Posts)

export default Posts
