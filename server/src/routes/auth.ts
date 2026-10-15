import { type FastifyInstance } from "fastify";
import { db } from "../index";
import * as z from "zod";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import services from "../services";

export default async function AuthRoutes(app: FastifyInstance) {
  const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, "A senha é obrigatória"),
    remember: z.boolean().default(false),
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
            data: z.object({
              token: z.string(),
              user: z.object({
                email: z.email(),
                id: z.uuid(),
                name: z.string(),
              }),
            }),
          }),
          400: z.object({
            message: z.string(),
            data: z.array(
              z.object({
                field: z.string(),
                message: z.string(),
              }),
            ),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
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
            data: result.error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
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
          });
        }

        const current_user = user[0];

        // const passwords_is_equals = services.compare_password(
        //   password,
        //   current_user.password,
        // );

        // if (!passwords_is_equals) {
        //   return res.status(400).send({ message: "Email ou senha incorretos" });
        // }

        const token = services.sign_token({
          data: {
            id: current_user.id,
            email: current_user.email,
            name: current_user.name,
          },
          remember,
        });

        return res.status(200).send({
          message: "Login autorizado",
          data: {
            token,
            user: {
              id: current_user.id,
              email: current_user.email,
              name: current_user.name,
            },
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
