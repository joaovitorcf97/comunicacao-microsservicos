import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESS,
  UNAUTHORIZED,
} from '@/config/constants/httpStatus';
import { apiSecret } from '@/config/constants/secret';
import { CustomRequest } from '@/config/middlewares/checkToken';
import bcrypt from 'bcryptjs';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import UserException from '../exception/UserException';
import UserRepository from '../repository/UserRepository';

class UserService {
  async findByEmail(request: Request) {
    try {
      const { email } = request.params;
      const { token } = request as CustomRequest;
      this.validateRequestData(email);
      const user = await UserRepository.findByEmail(email);
      this.validateUserNotFound(user);
      this.validateAuthenticatedUser(user!, token.payload.authUser);

      return {
        status: SUCCESS,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.status,
      };
    }
  }

  validateRequestData(email: string) {
    if (!email) {
      throw new UserException(BAD_REQUEST, 'User emai, not found.');
    }
  }

  validateUserNotFound(user: User | undefined | null) {
    if (!user) {
      throw new UserException(NOT_FOUND, 'User not found.');
    }
  }

  async getAccessToken(request: Request) {
    try {
      const { email, password } = request.body;
      this.validateAccessTokenData(email, password);

      const user = await UserRepository.findByEmail(email);
      this.validateUserNotFound(user);

      await this.validatePassword(password, user?.password);
      const authUser = { id: user?.id, name: user?.name, email: user?.email };

      const accessToken = jwt.sign({ authUser }, apiSecret, {
        expiresIn: '1d',
        notBefore: '0',
        algorithm: 'HS256',
      });

      return {
        status: SUCCESS,
        accessToken,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.status,
      };
    }
  }

  validateAccessTokenData(email: string, password: string) {
    if (!email || !password) {
      throw new UserException(
        UNAUTHORIZED,
        'E-mail or password must be infomerd',
      );
    }
  }

  async validatePassword(password: string, hashPassword?: string) {
    if (!(await bcrypt.compare(password, hashPassword!))) {
      throw new UserException(UNAUTHORIZED, 'Password doesn`t match');
    }
  }

  validateAuthenticatedUser(user: User, authUser: User) {
    if (!authUser || user.id !== authUser.id) {
      throw new UserException(FORBIDDEN, 'You cacnnot see this user data');
    }
  }
}

export default new UserService();
