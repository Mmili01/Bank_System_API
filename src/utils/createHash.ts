import * as crypto from 'crypto';

const hashObject = (obj: object) => {
  // Convert the object to a JSON string before hashing
  const jsonString = JSON.stringify(obj);
  return crypto.createHash('md5').update(jsonString).digest('hex');
};

export default hashObject;