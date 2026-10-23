import { z } from "zod";
export const operationEnum = z.enum(["income", "expense"]);

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

const TransactionSchema = z.object({
  id: z.cuid2(),
  amount: z.number(),
  category: z.string(),
  owner_id: z.uuid(),
  description: z.string(),
  date: z.date(),
  operation: operationEnum,
  fixed: z.boolean(),
});

const GetTransactionsResponseSchema = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.cuid2(),
      amount: z.number(),
      category: z.string(),
      owner_id: z.uuid(),
      description: z.string(),
      date: z.coerce.date(),
      operation: operationEnum,
      fixed: z.boolean(),
    }),
  ),
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
  exp: z.number(),
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

const RegisterResponseSchema = z.object({
  message: z.string(),
});

export {
  UserSchema,
  LoginSchema,
  TransactionSchema,
  VerifyResponseSchema,
  LoginResponseSchema,
  UserLoginResponseSchema,
  RegisterResponseSchema,
  GetTransactionsResponseSchema,
};
