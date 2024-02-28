import { DataTypes } from 'sequelize'

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('volunteer_tokens', 'created_at', {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  })

  await queryInterface.addColumn('volunteer_tokens', 'updated_at', {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  })

  await queryInterface.addColumn('agency_tokens', 'created_at', {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  })

  await queryInterface.addColumn('agency_tokens', 'updated_at', {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('volunteer_tokens', 'created_at')
  await queryInterface.removeColumn('volunteer_tokens', 'updated_at')
  await queryInterface.removeColumn('agency_tokens', 'created_at')
  await queryInterface.removeColumn('agency_tokens', 'updated_at')
}
export { up, down }
