import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { User } from './model/user.model';
import { v4 } from 'uuid';
import { UserInsertModel } from './model/userInsertModel.dto';
const bcrypt = require('bcrypt');
import { UserUpdateModel } from './model/userUpdateModel.dto';
import { ConfigService } from '@nestjs/config';
import { GeneralService } from 'src/general/general.service';
@Injectable()
export class UserService {
  constructor(private configService: ConfigService) {}
  private users: User[] = [];
  async getAll() {
    return GeneralService.serviceResult(
      '',
      [...this.users].map((item) => {
        delete item.password;
        return item;
      }),
    );
  }
  async getById(userId: string) {
    let userInfo = this.users.find((user) => user.userId == userId);
    delete userInfo.password;
    return GeneralService.serviceResult('', userInfo);
  }
  async insert(userInsertModel: UserInsertModel) {
    let userExist = this.users.find(
      (user) => user.username == userInsertModel.username,
    );
    if (userExist)
      GeneralService.raiseError(
        'username is not valid,please choose another one',
      );

    let user: User = new User();
    user.userId = v4();
    user.email = userInsertModel.email;
    user.username = userInsertModel.username;
    user.password = bcrypt.hashSync(
      userInsertModel.password,
      +this.configService.get('BCRYPTSALT'),
    );
    user.fullName = userInsertModel.fullName;

    this.users.push(user);
    return GeneralService.serviceResult('insert successfully Done', {
      userId: user.userId,
      username: user.username,
    });
  }
  async update(userId: string, user: UserUpdateModel) {
    let userIndex = this.users.findIndex((user) => user.userId == userId);
    if (userIndex == -1) GeneralService.raiseError('user not found');

    this.users[userIndex].fullName = user.fullName;
    this.users[userIndex].email = user.email;

    return GeneralService.serviceResult('user updated successfully', {
      userId,
    });
  }
  async delete(userId) {
    let userIndex = this.users.findIndex((user) => user.userId == userId);
    if (userIndex == -1)
      GeneralService.raiseError(
        'userId is not valid,please choose another one',
      );
    this.users.splice(userIndex, 1);
    return GeneralService.serviceResult('delete successfullly Done', {
      userId,
    });
  }
}
