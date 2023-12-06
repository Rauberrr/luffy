import { DataTypes } from 'sequelize'
import sequelize from '../../config/database'
import Comments from './Comments'

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

Posts.hasMany(Comments)
Comments.belongsTo(Posts)

export default Posts
