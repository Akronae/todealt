import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './notes.schema';
import { Model } from 'mongoose';
import { CreateNoteDto, DeleteNoteDto, UpdateNoteDto } from './notes.dto';
import { Err } from '@/utils/err';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(dto: CreateNoteDto, owner: string): Promise<Note> {
    const createdNote = new this.noteModel({ ...dto, owner });
    return await createdNote.save();
  }

  async update(dto: UpdateNoteDto, owner: string): Promise<Note> {
    return (
      (await this.noteModel.findOneAndUpdate({ owner, _id: dto._id }, dto, {
        new: true,
      })) ?? Err(`Note with id ${dto._id} not found`)
    );
  }

  async delete(dto: DeleteNoteDto, owner: string): Promise<Note> {
    return (
      (await this.noteModel.findOneAndDelete({ owner, _id: dto._id })) ??
      Err(`Note with id ${dto._id} not found`)
    );
  }

  async findAllByOwner(owner: string): Promise<Note[]> {
    return await this.noteModel.find({ owner }).exec();
  }
}
