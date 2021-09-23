import { createUser as cUser, deleteUser as dUser } from '../models/User.js';

export const createUser = (user_bd) => () => {
  return cUser(user_bd);
};

export const deleteUser = (user_bd) => (data) => {
  const { user_id } = data;

  return user_id ? dUser(user_bd, user_id) : null;
};
