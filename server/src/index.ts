import { config } from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { usersTable } from "./db/schema";

config();
const app = Fastify({
  logger: true,
});

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não foi definida.");
}
const client = postgres(connectionString);
export const db = drizzle({ client });

await app.register(cors, {
  origin: "*",
  methods: ["POST", "GET", "DELETE", "PUT"],
});

await app.register(import("@fastify/swagger"));

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

app.get(
  "/",
  {
    schema: {
      description: "Rota de teste",
      tags: ["teste"],
      response: {
        200: {
          hello: "",
        },
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
