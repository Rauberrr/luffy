import { DataTypes } from 'sequelize'
import sequelize from '../../config/database'
// import OtherUser from './OtherUser'

const Posts = sequelize.define('post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  }
})

// Posts.hasMany(OtherUser)
// OtherUser.belongsTo(Posts)

export default Posts
