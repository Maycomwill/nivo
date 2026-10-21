import { type FastifyInstance } from "fastify";
import { db } from "../index";
import * as z from "zod";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import services from "../services";

export default async function AuthRoutes(app: FastifyInstance) {
  const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, "A senha é obrigatória."),
    remember: z.boolean().default(false),
  });
  const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
    name: z.string(),
  });

  const verifySchema = z.object({
    token: z.string(),
  });

  app.post(
    "/login",
    {
      schema: {
        tags: ["auth"],
        description: "Rota de login",
        body: loginSchema,
        response: {
          200: z.object({
            message: z.string(),
            token: z.string(),
            exp: z.number(),
            user:
              z.object({
                email: z.email(),
                id: z.uuid(),
                name: z.string(),
              }) || z.null(),
          }),
          400: z.object({
            message: z.string(),
            token: z.string(),
            exp: z.number(),
            user: z.null(),
          }),
          404: z.object({
            message: z.string(),
            token: z.string(),
            exp: z.number(),
            user: z.null(),
          }),
          500: z.object({
            message: z.string(),
            token: z.string(),
            exp: z.number(),
            user: z.null(),
          }),
        },
      },
    },
    async (req, res) => {
      try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).send({
            message: "Dados inválidos",
            token: "",
            exp: 0,
            user: null,
          });
        }

        const { email, password, remember } = result.data;
        let user = null;
        user = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);
        console.log(user);

        if (user.length === 0 || user[0] === undefined) {
          console.log("USUÁRIO NÃO ENCONTRADO");
          return res.status(404).send({
            message: "Usuário inexistente",
            token: "",
            exp: 0,
            user: null,
          });
        }

        const current_user = user[0];

        const passwords_is_equals = services.compare_password(
          password,
          current_user.password,
        );

        if (!passwords_is_equals) {
          return res.status(400).send({ message: "Email ou senha incorretos" });
        }

        const token = services.sign_token({
          data: {
            id: current_user.id,
            email: current_user.email,
            name: current_user.name,
          },
          remember,
        });
        const verify_token = services.verify_token(token);
        console.log(verify_token);

        return res.status(200).send({
          message: "Login autorizado",
          token,
          exp: verify_token.data!.exp,
          user: {
            id: current_user.id,
            email: current_user.email,
            name: current_user.name,
          },
        });
      } catch (error) {
        if (error instanceof z.ZodError || error instanceof Error) {
          return res.status(500).send({
            message: error.message,
            token: "",
            exp: 0,
            user: null,
          });
        }
        req.log.error(error);

        return res.status(500).send({
          message: "Erro interno do servidor",
          token: "",
          exp: 0,
          user: null,
        });
      }
    },
  );

  app.post(
    "/register",
    {
      schema: {
        tags: ["auth"],
        description: "Rota de registro de usuário",
        body: registerSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      type NewUser = typeof usersTable.$inferInsert;
      try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).send({
            message: "Dados inválidos",
            // data: result.error.issues.map((issue) => ({
            //   field: issue.path.join("."),
            //   message: issue.message,
            // })),
          });
        }

        const { email, name, password } = result.data;

        const encrypted_password = services.encrypt_password(password);
        const new_user: NewUser = { name, email, password: encrypted_password };

        const create_an_user = async (user: NewUser) => {
          return db
            .insert(usersTable)
            .values(user)
            .returning({ new_user_id: usersTable.id });
        };

        await create_an_user(new_user);

        return res.status(201).send({
          message: "Usuário criado com sucesso",
        });
      } catch (error) {
        if (error instanceof z.ZodError || error instanceof Error) {
          return res.status(500).send({
            message: error.message,
            data: {
              field: error.cause,
            },
          });
        }
        req.log.error(error);

        return res.status(500).send({
          message: "Erro interno do servidor",
        });
      }
    },
  );

  app.post(
    "/verify",
    {
      schema: {
        tags: ["auth"],
        description: "Rota de verificação da validade do token de acesso",
        body: verifySchema,
        response: {
          200: z.object({
            message: z.string(),
            token: z.string(),
            data: z.object({
              email: z.email(),
              id: z.uuid(),
              name: z.string(),
              iat: z.number(),
              exp: z.number(),
            }),
          }),
          400: z.object({
            message: z.string(),
            data: z.null(),
          }),
          500: z.object({
            message: z.string(),
            data: z.null(),
          }),
        },
      },
    },
    async (req, res) => {
      try {
        const result = verifySchema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).send({
            message: "Token inválido",
          });
        }

        const { token } = result.data;

        const decoded = services.verify_token(token);
        if (!decoded.valid || decoded.data === null) {
          return res
            .status(400)
            .send({ message: "Token inválido", data: null });
        }
        return res.status(200).send({
          message: "Token válido",
          token,
          data: {
            name: decoded.data.name,
            email: decoded.data.email,
            id: decoded.data.id,
            iat: decoded.data.iat,
            exp: decoded.data.exp,
          },
        });
      } catch (error) {
        if (error instanceof z.ZodError || error instanceof Error) {
          return res.status(500).send({
            message: error.message,
          });
        }
        req.log.error(error);

        return res.status(500).send({
          message: "Erro interno do servidor",
        });
      }
    },
  );
}
