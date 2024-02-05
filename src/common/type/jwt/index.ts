export interface IJwtPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export interface IPayload {
  sub: number;
  email: string;
}
