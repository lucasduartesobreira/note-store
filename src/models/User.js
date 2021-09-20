let user_bd = new Map();

user_bd.set(1, {
  id: 1,
  notes: new Map(),
});

export const insertNote = (user_id, body, title) => {
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

