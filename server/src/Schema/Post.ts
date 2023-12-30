import { DataTypes, type Model } from 'sequelize'
import sequelize from '../config/database'
// import User from './User'
import { v4 as uuidv4 } from 'uuid'

interface PostProps extends Model {
  postId: string
  userId: string
  name: string
  content: string
  img?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }

}

const Posts = sequelize.define<PostProps>('post', {
  postId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID
  },
  name: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.JSONB
  }
})

// User.hasMany(Posts)

export default Posts
