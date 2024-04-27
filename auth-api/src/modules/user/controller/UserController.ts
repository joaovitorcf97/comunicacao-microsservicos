import { Request, Response } from 'express';
import UserService from '../service/UserService';

class UserController {
  async findByEmail(request: Request, response: Response) {
    const user = await UserService.findByEmail(request);

    return response.status(user.status).json(user);
  }

  async getAccessToken(request: Request, response: Response) {
    const accessToken = await UserService.getAccessToken(request);

    return response.status(accessToken.status).json(accessToken);
  }
}

export default new UserController();
