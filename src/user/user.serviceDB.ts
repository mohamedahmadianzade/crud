import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { User } from './model/user.model';
import { UserInsertModel } from './model/userInsertModel.dto';
const bcrypt = require('bcrypt');
import { UserUpdateModel } from './model/userUpdateModel.dto';
import { ConfigService } from '@nestjs/config';
import { GeneralService } from 'src/general/general.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/db/user.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
@Injectable()
export class UserServiceDB {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  private users: User[] = [];
  async getAll() {
    let result = await this.userRepository.find();
    return GeneralService.serviceResult('', result);
  }
  async getByUserId(userId: string) {
    let userInfo = await this.userRepository.findOneBy({
      userId,
    });
    if (userInfo) delete userInfo.password;
    return GeneralService.serviceResult('', userInfo);
  }
  async insert(userInsertModel: UserInsertModel) {
    let userExist = await this.userRepository.findOneBy({
      username: userInsertModel.username,
    });
    if (userExist)
      GeneralService.raiseError(
        'username is not valid,please choose another one',
      );

    let user: UserEntity = new UserEntity();
    user.userId = uuid();
    user.email = userInsertModel.email;
    user.username = userInsertModel.username;
    user.password = bcrypt.hashSync(
      userInsertModel.password,
      +this.configService.get('BCRYPTSALT'),
    );
    user.fullName = userInsertModel.fullName;

    let result = await this.userRepository.insert(user);
    return GeneralService.serviceResult('insert successfully Done', {
      userId: user.userId,
      username: user.username,
    });
  }
  async update(userId: string, user: UserUpdateModel) {
    let userInfo = await this.userRepository.findOneBy({
      userId,
    });
    if (!userInfo) GeneralService.raiseError('user not found');

    userInfo.fullName = user.fullName;
    userInfo.email = user.email ? user.email : userInfo.email;
    await this.userRepository.update({userId}, userInfo);

    return GeneralService.serviceResult('user updated successfully', {
      userId,
    });
  }
  async delete(userId: string) {
    let result = await this.userRepository.delete({userId});
    if (result.affected == 0)
      GeneralService.raiseError(
        'userId is not valid,please choose another one',
      );
    return GeneralService.serviceResult('delete successfullly Done', {
      userId,
    });
  }
}
