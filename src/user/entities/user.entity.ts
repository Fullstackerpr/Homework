import { PostEntity } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar'})
    full_name: string

    @Column({type: 'varchar'})
    email: string

    @OneToMany(() => PostEntity, posts => posts.user)
    posts: PostEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}
