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
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('')
  async getAll() {
    let result = await this.userService.getAll();
    return result;
  }

  @Get(':id')
  async getById(@Param('id') userId: string) {
    let result = await this.userService.getById(userId);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') userId: string) {
    let result = await this.userService.delete(userId);
    return result;
  }

  @Post()
  async insert(@Body() userInsertModel: UserInsertModel) {
    let result = await this.userService.insert(userInsertModel);
    return result;
  }
  @Put(":id")
  async update(@Param("id") userId:string,@Body() userUpdateModel: UserUpdateModel) {
    let result = await this.userService.update(userId,userUpdateModel);
    return result;
  }
}
