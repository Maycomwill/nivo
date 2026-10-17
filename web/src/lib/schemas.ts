import { z } from "zod";

const UserSchema = z.object({
  email: z.email(),
  id: z.uuid(),
  name: z.string(),
});

const LoginSchema = z.object({
  email: z.email(),
  password: z.email(),
  remember: z.boolean(),
});

const VerifyResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
  data: z.object({
    email: z.email(),
    id: z.uuid(),
    name: z.string(),
    iat: z.number(),
    exp: z.number(),
  }),
});

const LoginResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
  user:
    z.object({
      email: z.email(),
      id: z.uuid(),
      name: z.string(),
    }) || z.null(),
});
const UserLoginResponseSchema = z.object({
  email: z.email(),
  id: z.uuid(),
  name: z.string(),
});

export { VerifyResponseSchema, LoginResponseSchema, UserSchema, UserLoginResponseSchema, LoginSchema };
