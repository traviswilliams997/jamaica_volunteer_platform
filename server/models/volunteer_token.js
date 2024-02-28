import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class VolunteerToken extends Model {}

VolunteerToken.init(
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
    username: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'volunteer_token',
  }
)

export default VolunteerToken
