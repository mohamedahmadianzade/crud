import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  userId: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  fullName: string;
  @Column()
  email: string;
}
