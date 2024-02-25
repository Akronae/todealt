/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNoteDto } from "../models/CreateNoteDto";
import type { DeleteNoteDto } from "../models/DeleteNoteDto";
import type { Note } from "../models/Note";
import type { UpdateNoteDto } from "../models/UpdateNoteDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class DefaultService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns Note
   * @throws ApiError
   */
  public notesControllerGetNotes(): CancelablePromise<Array<Note>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/notes",
    });
  }
  /**
   * @returns Note
   * @throws ApiError
   */
  public notesControllerCreateNote({
    requestBody,
  }: {
    requestBody: CreateNoteDto;
  }): CancelablePromise<Note> {
    return this.httpRequest.request({
      method: "POST",
      url: "/notes",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * @returns Note
   * @throws ApiError
   */
  public notesControllerUpdateNote({
    requestBody,
  }: {
    requestBody: UpdateNoteDto;
  }): CancelablePromise<Note> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/notes",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * @returns Note
   * @throws ApiError
   */
  public notesControllerDeleteNote({
    requestBody,
  }: {
    requestBody: DeleteNoteDto;
  }): CancelablePromise<Note> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/notes",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
