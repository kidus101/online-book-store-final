import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.config';
import User from './userEntity';
import Book from './bookEntity'; 
class Order extends Model {
    public id!: number;
    public customerId!: number;
    public bookId!: number;
    public orderedDate!: Date;

    // Other properties and methods can be defined here

    // Define the model associations
    public static associate(): void {
        Order.belongsTo(User, { foreignKey: 'customerId' });
        Order.belongsTo(Book, { foreignKey: 'bookId' });
    }

    // Define the model attributes
    public static initModel(): void {
        Order.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                customerId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                bookId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                orderedDate: {
                    type: DataTypes.DATE,
                    defaultValue: new Date(),
                },
            },
            {
                sequelize,
                modelName: 'Order',
                tableName: 'orders',
                timestamps: false,
            }
        );
    }
}

// Initialize the model
Order.initModel();

// Associate the model with other models
Order.associate();

export { Order };