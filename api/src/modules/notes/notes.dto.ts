export class CreateNoteDto {
  body: string;
  tags: string[];
}

export class UpdateNoteDto {
  _id: string;
  body: string;
  tags: string[];
}

export class DeleteNoteDto {
  _id: string;
}
