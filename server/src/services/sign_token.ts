import jwt from "jsonwebtoken";

interface JwtPayload {
  data: {
    email: string;
    id: string;
    name: string;
  };
  remember: boolean;
}

export default function signToken({ data, remember }: JwtPayload) {
  const secret = process.env.JWTSECRET;

  if (!secret) {
    throw new Error("JWTSECRET não foi definida.");
  }

  console.log(jwt.sign(data, secret, { expiresIn: remember ? "30d" : "1d" }));

  return jwt.sign(data, secret, {
    expiresIn: remember ? "30d" : "1d",
  });
}
