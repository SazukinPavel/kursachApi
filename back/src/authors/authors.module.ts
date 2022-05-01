import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/entitys/Author.entity';
import { AuthorBio } from 'src/entitys/AuthorBio.entity';
import { UserModule } from 'src/user/user.module';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports:[TypeOrmModule.forFeature([Author,AuthorBio]),UserModule],
  controllers: [AuthorsController],
  providers: [AuthorsService]
})
export class AuthorsModule {}
