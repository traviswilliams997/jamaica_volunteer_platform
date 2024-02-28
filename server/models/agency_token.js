import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class AgencyToken extends Model {}

AgencyToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    agencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'agencies', key: 'id' },
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
    modelName: 'agency_token',
  }
)

export default AgencyToken
