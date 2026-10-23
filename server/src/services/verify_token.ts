import jwt from "jsonwebtoken";
interface JwtPayload {
  email: string;
  id: string;
  name: string;
  iat: number;
  exp: number;
}
export default function VerifyToken(token: string) {
  const secret = process.env.JWTSECRET;

  if (!secret) {
    throw new Error("JWTSECRET não foi definida.");
  }

  try {
    const payload = jwt.verify(token, secret);

    if (
      typeof payload === "string" ||
      typeof payload.email !== "string" ||
      typeof payload.id !== "string" ||
      typeof payload.name !== "string"
    ) {
      return { valid: false, data: null };
    }

    console.log(payload)

    return {
      valid: true,
      data: payload as JwtPayload,
    };
  } catch {
    return {
      valid: false,
      data: null,
    };
  }
}
