import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants';

export const usersProviders = [
  {
    provider: USER_REPOSITORY,
    useValue: User,
  },
];
