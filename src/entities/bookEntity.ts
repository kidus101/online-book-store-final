import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.config';

class Book extends Model {
    public id!: number;
    public title!: string;
    public coverImageUrl!: string;
    // public coverImagePublicId!: string;
    public writer!: string;
    public point!: number;
    public tag!: string;

    // Other methods and associations can be defined here

}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coverImageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // coverImagePublicId: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        writer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Book',
    }
);

export default Book;