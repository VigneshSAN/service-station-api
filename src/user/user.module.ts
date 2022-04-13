import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserAuthSchema } from 'src/auth/schema/user.schema';
import { JwtStrategy } from 'src/auth/strategies/jwt-auth.strategy';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'UserAuth', schema: UserAuthSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: "theremayberainonfriday",
      signOptions: { expiresIn: '365d' },
    })
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy]
})
export class UserModule { }
