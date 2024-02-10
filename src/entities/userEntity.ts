import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.config';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public point ?: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        point: {
            type: DataTypes.INTEGER,
            defaultValue: 100,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;