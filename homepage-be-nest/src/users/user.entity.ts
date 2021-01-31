import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Post from '../posts/post.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ default: '3' })
  public lv: number;

  @Column({ type: 'text', nullable: true })
  public photo: string;

  @Column({ type: 'boolean' })
  public termsAgree: boolean;

  @Column({ type: 'boolean', default: true })
  public approval: boolean;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];
}

export default User;
