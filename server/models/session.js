import { Model, DataTypes } from 'sequelize'
import sequelize from '../utils/db'

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    agencyId: {
      type: DataTypes.INTEGER,
      references: { model: 'agencies', key: 'id' },
    },
    volunteerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'volunteers', key: 'id' },
    },
    sessionStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sessionEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    workDone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'session',
  }
)

export default Session
