import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { PagemetaModule } from './pagemeta/pagemeta.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        UPLOAD_LOCATION: Joi.string().required(),
        FILE_SIZE: Joi.number().required(),
        IMAGE_SIZE: Joi.number().required(),
      }),
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    CategoriesModule,
    AuthenticationModule,
    AttachmentsModule,
    PagemetaModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
