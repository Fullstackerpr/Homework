import { Column, Table, Model, DataType } from "sequelize-typescript";

@Table({tableName:'users'})
export class User extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    firstName:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    lastName:string;

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    age:number;
}