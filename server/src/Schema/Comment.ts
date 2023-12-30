import { DataTypes, type Model } from 'sequelize'
import sequelize from '../config/database'
import { v4 as uuidv4 } from 'uuid'

interface CommentProps extends Model {
  userId: string
  postId: string
  commentId: string
  comment: string
  name: string
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

const Comment = sequelize.define<CommentProps>('comment', {
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
  name: {
    type: DataTypes.STRING
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.JSONB
  }
})

export default Comment
