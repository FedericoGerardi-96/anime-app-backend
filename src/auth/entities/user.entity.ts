import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  _id?: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  name: string;
  @Prop({ minlength: 6, required: true })
  password?: string;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({ default: "https://res.cloudinary.com/do3n04ysn/image/upload/v1692600735/anime-app/gw87wdnbncrslkemdxe4.png" })
  icon: string;
  @Prop({ type: [String], default: ['muggle'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
