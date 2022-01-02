import notes from '../models/Notes.js';

export const insertNote = (user_bd) => (data) => {
  const { user_id, body, title } = data;

  return user_id && body && title
    ? notes.insertNote(user_bd, Number(user_id), body, title)
    : null;
};

export const updateNoteTitle = (user_bd) => (data) => {
  const { user_id, note_id, title } = data;

  return user_id && note_id && title
    ? notes.updateNoteTitle(user_bd, Number(user_id), note_id, title)
    : null;
};

export const updateNoteBody = (user_bd) => (data) => {
  const { user_id, note_id, body } = data;

  return user_id && note_id && body
    ? notes.updateNoteBody(user_bd, Number(user_id), note_id, body)
    : null;
};

export const getNote = (user_bd) => (data) => {
  const { user_id, note_id } = data;

  return user_id && note_id
    ? notes.getNote(user_bd, Number(user_id), note_id)
    : null;
};

export const getNotes = (user_bd) => (data) => {
  const { user_id } = data;

  return user_id ? notes.getAllNotes(user_bd, Number(user_id)) : null;
};

export const deleteNote = (user_bd) => (data) => {
  const { user_id, note_id } = data;

  return user_id && note_id
    ? notes.deleteNote(user_bd, Number(user_id), note_id)
    : null;
};

export const deleteAllNotes = (user_bd) => (data) => {
  const { user_id } = data;

  return user_id ? notes.deleteAllNotes(user_bd, Number(user_id)) : null;
};
