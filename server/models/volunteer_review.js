import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

class VolunteerReview extends Model {}

VolunteerReview.init(
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
    reviewedVolunteerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'volunteers', key: 'id' },
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
    modelName: 'volunteer_review',
  }
)

export default VolunteerReview
