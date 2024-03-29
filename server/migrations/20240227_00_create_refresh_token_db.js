import { DataTypes } from 'sequelize'

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('volunteer_tokens', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    volunteer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'volunteers', key: 'id' },
    },
    username: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.TEXT,
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

  await queryInterface.createTable('agency_tokens', {
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
    username: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.TEXT,
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

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('volunteer_tokens')
  await queryInterface.dropTable('agency_tokens')
}
export { up, down }
