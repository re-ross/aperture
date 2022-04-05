import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);

    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
    const salt = bcrypt.genSaltSync(15);
    const hashedPass = await bcrypt.hash(user.password, salt);

    const newUser = await this.userService.create({
      ...user,
      password: hashedPass,
    });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser['dataValues'];

    const token = await this.generateToken(result);

    return { user: result, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  //   private async hashPassword(password) {
  //     const salt = bcrypt.genSaltSync(15);
  //     const hash = await bcrypt.hashSync(password, salt);
  //     return hash;
  //   }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compareSync(enteredPassword, dbPassword);
    return match;
  }
}
