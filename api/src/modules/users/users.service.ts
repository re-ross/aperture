import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async create(UserDto: UserDto): Promise<User> {
    const user = new User();

    user.name = UserDto.name;
    user.email = UserDto.email;
    user.password = UserDto.password;

    return user.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne<User>({
        where: { email },
      });

      return user;
    } catch (e) {
      throw e;
    }
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}
