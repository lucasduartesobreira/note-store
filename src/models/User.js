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

export default { create, remove };
