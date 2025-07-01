import { CategoryEntity } from "src/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
    category: CategoryEntity;
}