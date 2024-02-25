import { Model, DataTypes } from 'sequelize'
import sequelize from '../utils/db'

class Membership extends Model {}

Membership.init(
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
    volunteerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'volunteer', key: 'id' },
    },
    currentMember: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    position: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'membership',
  }
)

export default Membership
