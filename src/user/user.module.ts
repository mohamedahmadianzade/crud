import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserControllerDB } from './user.controller.db';
import { UserService } from './user.service';
import { UserServiceDB } from './user.service.db';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './model/db/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController,UserControllerDB],
  providers: [UserService,UserServiceDB],
})
export class UserModule {}
