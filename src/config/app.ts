import { FastifyInstance, fastify } from "fastify";

import cors from "@fastify/cors";

import { healthCheck } from "../modules/healthCheck/healthCheckRoutes";
import {
  createXmlParams,
  createXmlRoutes,
} from "../modules/createXml/createXml.routes";
import { createTestRoutes } from "../tests/testRoutes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { enviaPareclado } from "../modules/createXml/enviaParcelado";
const app: FastifyInstance = fastify();

const apiPort = Number(process.env.PORT);
// app
app.register(cors, {
  origin: true,
});

app.register(fastifySwagger);
app.register(fastifySwaggerUi, {});
app.register(healthCheck);
app.register(createXmlRoutes);
app.register(createXmlParams);
app.register(createTestRoutes);

app
  .listen({
    port: apiPort,
  })
  .then(() => {
    console.log(`HTTP server running on http://localhost:${apiPort}`);
  });
