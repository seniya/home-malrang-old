import { Request } from 'express';
import User from '../../users/user.entity';

interface RequestWithUserIf extends Request {
  user: User;
}

export default RequestWithUserIf;
