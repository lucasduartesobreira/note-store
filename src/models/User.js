const insertNote = (user_bd, user_id, body, title) => {
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

 const updateNoteTitle = (user_bd, user_id, note_id, title) => {
  if (user_bd.has(user_id)) {
    const user = user_bd.get(user_id);
    if (user.notes.has(note_id)) {
      user.notes.get(note_id).title = title;
      return user.notes.get(note_id);
    }
  }
  return null;
};

 const updateNoteBody = (user_bd, user_id, note_id, body) => {
  if (user_bd.has(user_id)) {
    const user = user_bd.get(user_id);
    if (user.notes.has(note_id)) {
      user.notes.get(note_id).body = body;
      return user.notes.get(note_id);
    }
  }
  return null;
};

 const getNote = (user_bd, user_id, note_id) => {
  if (user_bd.has(user_id)) {
    const notes = user_bd.get(user_id).notes;
    return notes.has(note_id) ? notes.get(note_id) : null;
  }
  return null;
};

 const getAllNotes = (user_bd, user_id) => {
  if (user_bd.has(user_id)) {
    return user_bd.get(user_id).notes;
  }
  return null;
};

 const deleteNote = (user_bd, user_id, note_id) => {
  if (user_bd.has(user_id)) {
    return user_bd.get(user_id).notes.delete(note_id)
      ? 'Sucessfully deleted'
      : null;
  }
  return null;
};

 const deleteAllNotes = (user_bd, user_id) => {
  if (user_bd.has(user_id)) {
    let notes = user_bd.get(user_id).notes;
    notes.clear();
    return `Deleted all messages`;
  }
  return null;
};

 const create = (user_bd) => {
  user_bd.set(user_bd.size, {
    id: user_bd.size,
    notes: new Map(),
  });

  return user_bd.get(user_bd.size - 1);
};

 const remove = (user_bd, user_id) => {
  if (user_bd.delete(user_id)) {
    return 'Deleted user';
  }
  return null;
};

const user = {
  insertNote,
  updateNoteBody,
  updateNoteTitle,
  getNote,
  getAllNotes,
  deleteNote,
  deleteAllNotes,
  remove,
  create,
}

 export {
  user
}
