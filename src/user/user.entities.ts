import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column({ length: 18, unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;
}
