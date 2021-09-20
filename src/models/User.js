export const insertNote = (user_bd, user_id, body, title) => {
  if (user_bd.has(user_id)) {
    const user = user_bd.get(user_id);
    user.notes.set(user.notes.size, {
      id: user.notes.size,
      body,
      title,
    });

    return user.notes.get(user.notes.size - 1);
  }
  return null;
};

export const updateNoteTitle = (user_bd, user_id, note_id, title) => {
  if (user_bd.has(user_id)) {
    const user = user_bd.get(user_id);
    user.notes.get(note_id).title = title;
    return user.notes.get(note_id);
  }
  return null;
};

export const updateNoteBody = (user_bd, user_id, note_id, body) => {
  if (user_bd.has(user_id)) {
    const user = user_bd.get(user_id);
    user.notes.get(note_id).body = body;
    return user.notes.get(note_id);
  }
  return null;
};

export const getNote = (user_bd, user_id, note_id) => {
  if (user_bd.has(user_id)) {
    const notes = user_bd.get(user_id).notes;
    return notes.has(note_id) ? notes.get(note_id) : null;
  }
  return null;
};

export const getUserNotes = (user_bd, user_id) => {
  if (user_bd.has(user_id)) {
    return user_bd.get(user_id).notes;
  }
  return null;
};
