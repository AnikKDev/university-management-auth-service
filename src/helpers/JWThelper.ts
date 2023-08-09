import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const createToken = (
  data: Record<string, unknown>,
  secret: Secret,
  options: string
): string => {
  return jwt.sign(data, secret, {
    expiresIn: options,
  });
};

export const verifyJwtToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
