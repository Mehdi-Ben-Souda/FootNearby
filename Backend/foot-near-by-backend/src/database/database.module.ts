import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',  // Specify the type of your database (PostgreSQL)
                host: configService.getOrThrow('POSTGRES_HOST'),  // Database host, from your environment config
                port: configService.getOrThrow<number>('POSTGRES_PORT'),  // Database port, typically 5432 for PostgreSQL
                username: configService.getOrThrow('POSTGRES_USERNAME'),  // Database username
                password: configService.getOrThrow('POSTGRES_PASSWORD'),  // Database password
                database: configService.getOrThrow('POSTGRES_DB'),
                autoLoadEntities:true,
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}

