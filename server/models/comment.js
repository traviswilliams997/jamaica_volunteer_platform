import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'posts', key: 'id' },
    },
    createdByVolunteerId: {
      type: DataTypes.INTEGER,
      references: { model: 'volunteers', key: 'id' },
    },
    createdByAgencyId: {
      type: DataTypes.INTEGER,
      references: { model: 'agencies', key: 'id' },
    },
    commentRepyToId: {
      type: DataTypes.INTEGER,
      references: { model: 'comments', key: 'id' },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'comment',
  }
)

export default Comment
