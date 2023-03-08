import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GoogleStrategy } from './google.strategy';
import { LocalStrategy } from './local.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [UsersModule,
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'auth-gateway',
        }
      },
    }
  ],
  )],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, LocalStrategy]
})
export class AuthModule {}
