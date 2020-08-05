import * as Database from '../modules/database';

const params = ({
  title, description, userId, createdAt,
}) => ({
  title, description, userId, createdAt,
});

const create = async (data) => {
  const collection = 'projects';
  let result;
  data.createdAt = Database.currentTimestamp();

  try {
    result = await Database.add(collection, params(data));
  } catch (error) {
    result = await error;
  }

  return result;
};

const allProjects = async (userId) => {
  const collection = 'projects';
  const projects = await Database.getCollection(collection, { params: [{ key: 'userId', sign: '==', value: userId }], orderBy: { field: 'createdAt', order: 'desc' } });
  return projects;
};

export { create, allProjects };