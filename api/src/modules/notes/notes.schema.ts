import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  _id: string;

  @Prop({ required: false, default: '' })
  body: string;

  @Prop({ required: false, type: [String], default: [] })
  tags: string[];

  @Prop({ required: true })
  owner: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
