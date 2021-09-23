import {
  updateNoteTitle as updNoteTitle,
  updateNoteBody as updNoteBody,
  getNote as gNote,
  getUserNotes as gNotes,
  insertNote as pushNote,
  deleteNote as dNote,
  deleteAllNotes as dAllNotes,
} from '../models/User.js';

export const insertNote = (user_bd) => (data) => {
  const { user_id, body, title } = data;

  return user_id && body && title
    ? pushNote(user_bd, Number(user_id), body, title)
    : null;
};

export const updateNoteTitle = (user_bd) => (data) => {
  const { user_id, note_id, title } = data;

  return user_id && note_id && title
    ? updNoteTitle(user_bd, Number(user_id), note_id, title)
    : null;
};

export const updateNoteBody = (user_bd) => (data) => {
  const { user_id, note_id, body } = data;

  return user_id && note_id && body
    ? updNoteBody(user_bd, Number(user_id), note_id, body)
    : null;
};

export const getNote = (user_bd) => (data) => {
  const { user_id, note_id } = data;

  return user_id && note_id ? gNote(user_bd, Number(user_id), note_id) : null;
};

export const getNotes = (user_bd) => (data) => {
  const { user_id } = data;

  return user_id ? gNotes(user_bd, Number(user_id)) : null;
};

export const deleteNote = (user_bd) => (data) => {
  const { user_id, note_id } = data;

  return user_id && note_id ? dNote(user_bd, user_id, note_id) : null;
};

export const deleteAllNotes = (user_bd) => (data) => {
  const { user_id } = data;

  return user_id ? dAllNotes(user_bd, user_id) : null;
};
