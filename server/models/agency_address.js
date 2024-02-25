import { Model, DataTypes } from 'sequelize'
import sequelize from '../utils/db'

class AgencyAddress extends Model {}

AgencyAddress.init(
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
    streetNumber: {
      type: DataTypes.INTEGER,
    },
    streetName: {
      type: DataTypes.STRING,
    },
    addressLineOne: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLineTwo: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parish: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'agency_address',
  }
)

export default AgencyAddress
