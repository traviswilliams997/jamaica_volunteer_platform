import { DataTypes } from 'sequelize'

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('events', 'agency_name', {
    type: DataTypes.STRING,
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('events', 'agency_name')
}
export { up, down }
