import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../users/user.entity';
import Category from '../categories/category.entity';
import Attachment from 'src/attachments/attachment.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string; // 제목

  @Column({ nullable: true })
  public desc: string; // 간략 설명

  @Column({ nullable: true })
  public subject?: string; // 그룹 제목(동일 주제 시리즈)

  @Column({ nullable: true })
  public subjectTitle?: string; // 그룹 소 제목(동일 주제 시리즈)

  @Column({ nullable: true })
  public subjectOrder?: number; // 그룹 내 정렬(동일 주제 시리즈)

  @Column({ type: 'text' })
  public content: string;

  @Column({ type: 'text' })
  public contentHtml: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories?: Category[];

  @OneToOne(() => Attachment)
  @JoinColumn()
  public attachment?: Attachment;
}

export default Post;
