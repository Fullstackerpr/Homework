import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Group } from "src/group/schemas/group.shema";

@Schema()
export class Users extends Document{
    @Prop({required: true})
    name: string

    @Prop({required: true})
    age: number;

    @Prop({type: Types.ObjectId, ref: 'Group'})
    users: Group
}

export const UsersSchema = SchemaFactory.createForClass(Users);