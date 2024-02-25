/* eslint-disable */
export default async () => {
    const t = {
        ["./modules/notes/notes.schema"]: await import("./modules/notes/notes.schema")
    };
    return { "@nestjs/swagger": { "models": [[import("./modules/notes/notes.schema"), { "Note": { _id: { required: true, type: () => String }, body: { required: true, type: () => String }, tags: { required: true, type: () => [String] }, owner: { required: true, type: () => String } } }], [import("./modules/notes/notes.dto"), { "CreateNoteDto": { body: { required: true, type: () => String }, tags: { required: true, type: () => [String] } }, "UpdateNoteDto": { _id: { required: true, type: () => String }, body: { required: true, type: () => String }, tags: { required: true, type: () => [String] } }, "DeleteNoteDto": { _id: { required: true, type: () => String } } }]], "controllers": [[import("./modules/notes/notes.controller"), { "NotesController": { "getNotes": { type: [t["./modules/notes/notes.schema"].Note] }, "createNote": { type: t["./modules/notes/notes.schema"].Note }, "updateNote": { type: t["./modules/notes/notes.schema"].Note }, "deleteNote": { type: t["./modules/notes/notes.schema"].Note } } }]] } };
};