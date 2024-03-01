import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class AgencyReview extends Model {}

AgencyReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdByVolunteerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'volunteers', key: 'id' },
    },
    reviewedAgencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'agencies', key: 'id' },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'agency_review',
  }
)

export default AgencyReview
