import jwt, { Secret } from "jsonwebtoken";

export const createToken = (
  data: Record<string, unknown>,
  secret: Secret,
  options: string
): string => {
  return jwt.sign(data, secret, {
    expiresIn: options,
  });
};
