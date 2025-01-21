import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.devolopment.local']
    }),
    TypeOrmModule.forRootAsync(
      { 
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
         type: 'mssql', host: configService.get<string>('DB_HOST'),
         port: parseInt(configService.get<string>('DB_PORT'), 10),
         username: configService.get<string>('DB_USERNAME'),
         password: configService.get<string>('DB_PASSWORD'),
         database: configService.get<string>('DB_DATABASE'),
         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
         synchronize: true, 
        }), 
        inject: [ConfigService], 
      }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
