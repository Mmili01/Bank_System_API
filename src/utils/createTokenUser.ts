 const createTokenUser = (user: {
  firstname: string;
  lastName: string;
  surname: string;
  id: number;
  phoneNumber: any;
  username: string;
  role: string;
}) => {
  return {
    firstname: user.firstname,
    lastname: user.lastName,
    surname: user.surname,
    username: user.username,
    id: user.id,
    phoneNumber: user.phoneNumber,
  };
};

export default createTokenUser
