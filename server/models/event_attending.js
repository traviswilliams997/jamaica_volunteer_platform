import { Model, DataTypes } from 'sequelize'
import sequelize from '../utils/db'

class EventAttending extends Model {}

EventAttending.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'events', key: 'id' },
    },
    volunteerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'volunteers', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'event_attending',
  }
)

export default EventAttending
