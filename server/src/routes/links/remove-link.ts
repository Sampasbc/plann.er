import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";

export async function deleteLink(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().delete('/links/:linkId/delete', {
    schema: {
      params: z.object({
        linkId: z.string().uuid(),
      })
    },
  }, async (request, reply) => {
    const { linkId } = request.params

    const link = await prisma.link.findUnique({
      where: { id: linkId },
    })

    // Validate if trip exists
    if (!link) {
      throw new ClientError('The link you are trying to delete does not exist.')
    }

    await prisma.link.delete({
      where: { id: linkId }
    })

    reply.status(204).send()
  })
}
