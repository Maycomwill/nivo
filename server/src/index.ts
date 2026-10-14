import { config } from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

config();

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
  function (request, reply) {
    reply.status(200).send({ hello: "world" });
  },
);

app.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
