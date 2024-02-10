import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://wizjoysd:rDvRHdKbxMoIieSi7S8o0gjw4Z8FlOh-@baasu.db.elephantsql.com/wizjoysd');

// Test the connection
export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default sequelize;