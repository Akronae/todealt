import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Req,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { NotesService } from '@/modules/notes/notes.service';
import { Note } from './notes.schema';
import { CreateNoteDto, DeleteNoteDto, UpdateNoteDto } from './notes.dto';
import { AuthGuard, RequestWithUser } from '@/modules/auth/auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getNotes(@Req() req: RequestWithUser): Promise<Note[]> {
    return await this.notesService.findAllByOwner(req.user.sub);
  }

  @Post()
  async createNote(
    @Req() req: RequestWithUser,
    @Body() dto: CreateNoteDto,
  ): Promise<Note> {
    return await this.notesService.create(dto, req.user.sub);
  }

  @Put()
  async updateNote(
    @Req() req: RequestWithUser,
    @Body() dto: UpdateNoteDto,
  ): Promise<Note> {
    return await this.notesService.update(dto, req.user.sub);
  }

  @Delete()
  async deleteNote(
    @Req() req: RequestWithUser,
    @Body() dto: DeleteNoteDto,
  ): Promise<Note> {
    return await this.notesService.delete(dto, req.user.sub);
  }
}
