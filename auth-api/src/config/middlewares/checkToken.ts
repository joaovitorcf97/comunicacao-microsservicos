import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { apiSecret } from '../constants/secret';

export interface CustomRequest extends Request {
  token: jwt.JwtPayload;
}

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = <string>request.headers['authorization'];
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token?.split(' ')[1], apiSecret, {
      complete: true,
      algorithms: ['HS256'],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    });

    (request as CustomRequest).token = jwtPayload;

    return next();
  } catch (error) {
    response
      .status(401)
      .type('json')
      .send(JSON.stringify({ message: 'Missing or invalid token' }));
    return;
  }
};
