/* eslint-disable @typescript-eslint/consistent-type-definitions */
// we will use this customization to attach our custom property with any predefined express or node type
// in our case we are attaching user property with Request type which is comming from express types

import { JwtPayload } from "jsonwebtoken";

// !declaring global namespace
declare global {
  // we want to attach one thing in the namespace of expres Request type
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }
}
