import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function serverWake(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/server/wake', async (_, reply) => {

    reply.status(200).send({ message: 'Wake server up.' })

  })
}