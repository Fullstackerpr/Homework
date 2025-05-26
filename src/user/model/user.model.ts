import {Table, Column, DataType, Model} from "sequelize-typescript"

@Table({tableName: 'users'})
export class User extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    age: number
}