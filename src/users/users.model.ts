import {Model,Table,Column,DataType,BelongsToMany, HasMany } from 'sequelize-typescript'
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';

interface UserCreationAttrs{
    email: string,
    password: string
}

@Table({tableName: 'users'})

export class User extends Model<User,UserCreationAttrs>{

    @Column({type: DataType.INTEGER,unique: true,autoIncrement: true,primaryKey: true})
    id: number;
    
    @Column({type: DataType.STRING,unique: true,allowNull: false})
    email: string;

    @Column({type: DataType.STRING,allowNull: false})
    password: string;

    @Column({type: DataType.BOOLEAN,defaultValue: false})
    banned: boolean;

    @Column({type: DataType.STRING,unique: false,allowNull: true})
    banReason: string;

    @BelongsToMany(()=> Role, ()=>UserRoles)
    roles: Role[]

    @HasMany(()=> Post)
    posts: Post[]
}