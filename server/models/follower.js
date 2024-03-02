import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class Follower extends Model {}

Follower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    following_volunteer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'volunteers', key: 'id' },
    },
    followed_volunteer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'volunteers', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'follower',
  }
)

export default Follower
