import { JwtPayload } from './auth';
declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}
