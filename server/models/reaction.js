import { Model, DataTypes } from 'sequelize'
import sequelize from '../utils/db'

class Reaction extends Model {}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'posts', key: 'id' },
    },
    volunteerId: {
      type: DataTypes.INTEGER,
      references: { model: 'volunteers', key: 'id' },
    },
    agencyId: {
      type: DataTypes.INTEGER,
      references: { model: 'agencies', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'reaction',
  }
)

export default Reaction
