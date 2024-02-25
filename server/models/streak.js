import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class Streak extends Model {}

Streak.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    volunteerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'volunteers', key: 'id' },
    },
    streakStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastSession: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    streakLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'streak',
  }
)

export default Streak
