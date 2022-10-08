import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserInsertModel  } from './model/userInsertModel.dto';
import { UserUpdateModel  } from './model/userUpdateModel.dto';
import { UserServiceDB } from './user.serviceDB';

@Controller('usersdb')
export class UserControllerDB {
  constructor(private userService: UserServiceDB) {}
  @Get('')
  async getAll() {
    let result = await this.userService.getAll();
    return result;
  }

  @Get(':userId')
  async getById(@Param('userId') userId: string) {
    let result = await this.userService.getByUserId(userId);
    return result;
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    let result = await this.userService.delete(userId);
    return result;
  }

  @Post()
  async insert(@Body() userInsertModel: UserInsertModel) {
    let result = await this.userService.insert(userInsertModel);
    return result;
  }
  @Put(":userId")
  async update(@Param("userId") userId:string,@Body() userUpdateModel: UserUpdateModel) {
    let result = await this.userService.update(userId,userUpdateModel);
    return result;
  }
}
