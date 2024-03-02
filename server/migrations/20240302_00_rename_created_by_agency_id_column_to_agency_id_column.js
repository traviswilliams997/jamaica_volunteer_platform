import { DataTypes } from 'sequelize'

const up = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('positions')
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.createTable('positions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'agencies', key: 'id' },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    skills: {
      type: DataTypes.TEXT,
    },
    schedule: {
      type: DataTypes.TEXT,
    },
    vacancies: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  })
}
export { up, down }
