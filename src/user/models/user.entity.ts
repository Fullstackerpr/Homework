import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Country } from "src/country/model/country.entity";

@Table({tableName: 'user'})

export class User extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    age: number

    @ForeignKey(() => Country)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    countryId: number

    
    @BelongsTo(() => Country, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    country: Country
}