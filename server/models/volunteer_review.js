import { Model, DataTypes } from 'sequelize'
import sequelize from '../utils/db'

class VolunteerReview extends Model {}

VolunteerReview.init(
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
