import {
  updateNoteTitle as updNoteTitle,
  updateNoteBody as updNoteBody,
  getNote as gNote,
  getUserNotes as gNotes,
  pushNote,
} from '../models/User';

export const insertNote = (data) => {
  const { user_id, body, title } = data;

  return user_id && body && title
    ? pushNote(Number(user_id), body, title)
    : null;
};

export const updateNoteTitle = (data) => {
  const { user_id, note_id, title } = data;

  return user_id && note_id && title
    ? updNoteTitle(Number(user_id), note_id, title)
    : null;
};

export const updateNoteBody = (data) => {
  const { user_id, note_id, body } = data;

  return user_id && note_id && body
    ? updNoteBody(Number(user_id), note_id, body)
    : null;
};

export const getNote = (data) => {
  const { user_id, note_id } = data;

  return user_id && note_id ? gNote(Number(user_id), note_id) : null;
};

export const getNotes = (data) => {
  const { user_id } = data;

  return user_id ? gNotes(Number(user_id)) : null;
};
