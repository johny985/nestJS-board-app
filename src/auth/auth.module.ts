import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    // 유저를 인증하기 위해 사용할 기본 strategy를 명시해주기. 여기서는 jwt
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //jwt 인증 부분을 담당, 그리고 주로 sign() (jwt만들어 주기)를 위한 부분
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: { expiresIn: 60 & 60 },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  //JwtStrategy를 이 Auth 모듈에서 사용 할 수 있게 등록
  providers: [AuthService, JwtStrategy],
  // JwtStrategy, PassportModule를 다른 모듈에서 사용할 수 있게 등록
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
