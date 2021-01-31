import User from '../../users/user.entity';

const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  lv: 3,
  photo: '',
  termsAgree: true,
  approval: true,
  posts: [],
};

export default mockedUser;
