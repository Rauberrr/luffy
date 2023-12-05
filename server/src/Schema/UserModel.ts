import { DataTypes } from 'sequelize'
import sequelize from '../../config/database'

const Product = sequelize.define('produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Product
