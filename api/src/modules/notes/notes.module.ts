import { Module } from '@nestjs/common';
import { NotesController } from '@/modules/notes/notes.controller';
import { NotesService } from '@/modules/notes/notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './notes.schema';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
