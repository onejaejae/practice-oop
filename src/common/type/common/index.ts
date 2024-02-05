import { Request } from 'express';
import { IPayload } from '../jwt';

export interface ICodeName {
  get code();
  get name();
}

export interface RequestWithUser extends Request {
  user: IPayload;
}
