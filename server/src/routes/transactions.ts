import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { operationEnum, transactionTable } from "../db/schema";
import { db } from "..";
import { eq } from "drizzle-orm";

export default async function TransactionsRoutes(app: FastifyInstance) {
  const zodEnumOperation = z.enum(operationEnum.enumValues);
  const createSchema = z.object({
    description: z.string(),
    amount: z.number(),
    category: z.string(),
    owner_id: z.uuid(),
    operation: zodEnumOperation,
    date: z.coerce.date(),
    fixed: z.boolean().default(false),
  });
  const deleteSchema = z.object({
    transaction_id: z.cuid2(),
  });
  const putSchema = z.object({
    id: z.cuid2(),
    description: z.string().nullable(),
    amount: z.number().nullable(),
    category: z.string().nullable(),
    owner_id: z.uuid().nullable(),
    operation: zodEnumOperation,
    date: z.coerce.date().nullable(),
    fixed: z.boolean().default(false).nullable(),
  });

  app.post(
    "/create",
    {
      schema: {
        tags: ["transaction"],
        description: "Rota de criação de uma transação",
        body: createSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
            data:
              z.object({
                field: z.string(),
                message: z.string(),
              }) || z.null(),
          }),
          500: z.object({
            message: z.string(),
            data:
              z.object({
                field: z.string(),
                message: z.string(),
              }) || z.null(),
          }),
        },
      },
    },
    async (req, res) => {
      type NewTansaction = typeof transactionTable.$inferInsert;
      try {
        const result = createSchema.safeParse(req.body);

        if (!result.success) {
          return res.status(400).send({
            message: "Dados inválidos",
            data: result.error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          });
        }
        console.log(result.data);

        const {
          amount,
          category,
          date,
          description,
          fixed,
          operation,
          owner_id,
        } = result.data;

        const new_transaction: NewTansaction = {
          amount,
          category,
          date,
          description,
          fixed,
          operation,
          owner_id,
        };

        const create_new_transaction = async (transaction: NewTansaction) => {
          return db
            .insert(transactionTable)
            .values(transaction)
            .returning({ transaction_in: transactionTable.id });
        };

        await create_new_transaction(new_transaction);

        return res.status(201).send({
          message: "Transação cadastrada",
        });
      } catch (error) {
        if (error instanceof z.ZodError || error instanceof Error) {
          return res.status(500).send({
            message: error.message,
            data: null,
          });
        }
        req.log.error(error);

        return res.status(500).send({
          message: "Erro interno do servidor",
          data: null,
        });
      }
    },
  );

  app.delete(
    "/",
    {
      schema: {
        tags: ["transaction"],
        description: "Rota de deletar uma transação",
        body: deleteSchema,
        response: {
          200: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
            data:
              z.object({
                field: z.string(),
                message: z.string(),
              }) || z.null(),
          }),
          500: z.object({
            message: z.string(),
            data:
              z.object({
                field: z.string(),
                message: z.string(),
              }) || z.null(),
          }),
        },
      },
    },
    async (req, res) => {
      try {
        const result = deleteSchema.safeParse(req.body);

        if (!result.success) {
          return res.status(400).send({
            message: "Dados inválidos",
            data: result.error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          });
        }

        const { transaction_id } = result.data;

        await db
          .delete(transactionTable)
          .where(eq(transactionTable.id, transaction_id));

        return res.status(200).send({
          message: "Transação deletada",
        });
      } catch (error) {
        if (error instanceof z.ZodError || error instanceof Error) {
          return res.status(500).send({
            message: error.message,
            data: null,
          });
        }
        req.log.error(error);

        return res.status(500).send({
          message: "Erro interno do servidor",
          data: null,
        });
      }
    },
  );

  // app.put("/", {}, async (req, res) => {
  //   try {
  //     const result = putSchema.safeParse(req.body);

  //     if (!result.success) {
  //       return res.status(400).send({
  //         message: "Dados inválidos",
  //         data: result.error.issues.map((issue) => ({
  //           field: issue.path.join("."),
  //           message: issue.message,
  //         })),
  //       });
  //     }
  //   } catch (error) {
  //     if (error instanceof z.ZodError || error instanceof Error) {
  //       return res.status(500).send({
  //         message: error.message,
  //         data: null,
  //       });
  //     }
  //     req.log.error(error);

  //     return res.status(500).send({
  //       message: "Erro interno do servidor",
  //       data: null,
  //     });
  //   }
  // });
}
