import { Model, DataTypes } from 'sequelize'
import sequelize from '../utils/db'

class VolunteerAddress extends Model {}

VolunteerAddress.init(
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
    modelName: 'volunteer_address',
  }
)

export default VolunteerAddress
