import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI!), TaskModule],
})
export class AppModule {}
