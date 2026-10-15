import { config } from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { drizzle } from "drizzle-orm/postgres-js";
import AuthRoutes from "./routes/auth";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { z } from "zod";
import TransactionsRoutes from "./routes/transactions";

config();
const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não foi definida.");
}
export const db = drizzle(connectionString, { logger: true });
// export const db = drizzle({ client });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(cors, {
  origin: "*",
  methods: ["POST", "GET", "DELETE", "PUT"],
});

await app.register(import("@fastify/swagger"), {
  openapi: {
    info: {
      title: "Nivo API",
      description: "Documentação da API",
      version: "0.0.1",
    },
  },
  transform: jsonSchemaTransform,
});

await app.register(import("@fastify/swagger-ui"), {
  routePrefix: "/v1/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

await app.register(AuthRoutes, {
  prefix: "/auth",
});
await app.register(TransactionsRoutes, {
  prefix: "/transaction",
});

app.get(
  "/",
  {
    schema: {
      description: "Rota de teste",
      tags: ["teste"],
      response: {
        200: z.object({
          hello: z.string(),
        }),
      },
    },
  },
  async function (_, reply) {
    reply.status(200).send({
      hello: "World",
    });
  },
);

app.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
