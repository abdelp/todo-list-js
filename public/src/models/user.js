import * as Database from '../modules/database';

const params = ({ userName, createdAt }) => ({ userName, createdAt });

const create = async (data) => {
  const collection = 'users';
  let result;
  data.createdAt = Database.currentTimestamp();

  try {
    result = await Database.add(collection, params(data));
    localStorage.setItem('userId', result.id);
  } catch (error) {
    result = await error;
  }

  return result;
};

export default create;