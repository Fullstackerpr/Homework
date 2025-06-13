import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";



@Schema({toJSON: {virtuals: true}, toObject: {virtuals: true}})

export class Group extends Document {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    subject: string
}

export const GroupSchema = SchemaFactory.createForClass(Group)

GroupSchema.virtual('users', {
    ref: 'Users',
    localField: '_id',
    foreignField: 'group'
})