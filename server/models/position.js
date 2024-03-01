import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class Position extends Model {}

Position.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdByAgencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'agencies', key: 'id' },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    skills: {
      type: DataTypes.TEXT,
    },
    schedule: {
      type: DataTypes.TEXT,
    },
    vacancies: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'position',
  }
)

export default Position
