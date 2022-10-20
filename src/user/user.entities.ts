import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;
}
