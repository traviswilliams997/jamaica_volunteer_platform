import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdByVolunteerId: {
      type: DataTypes.INTEGER,
      references: { model: 'volunteers', key: 'id' },
    },
    createdByAgencyId: {
      type: DataTypes.INTEGER,
      references: { model: 'agencies', key: 'id' },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    posterPicturePath: {
      type: DataTypes.STRING,
    },
    picturePath: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'post',
  }
)

export default Post
