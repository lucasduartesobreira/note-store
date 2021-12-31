import { user} from '../models/User.js';

export const createUser = (user_bd) => () => {
  return user.create(user_bd);
};

export const deleteUser = (user_bd) => (data) => {
  const { user_id } = data;

  return user_id ? user.remove(user_bd, Number(user_id)) : null;
};
