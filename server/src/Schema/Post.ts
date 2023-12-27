import { DataTypes } from 'sequelize'
import sequelize from '../config/database'
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

export default Posts
