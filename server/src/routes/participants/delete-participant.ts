import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";

export async function deleteParticipant(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().delete('/participants/:participantId/delete', {
    schema: {
      params: z.object({
        participantId: z.string().uuid(),
      })
    }
  }, async (request, reply) => {

    const { participantId } = request.params

    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    })

    if (!participant) {
      throw new ClientError('The participant you\'re looking for does not exist.')
    }

    await prisma.participant.delete({
      where: { id: participantId }
    })

    reply.status(204).send()
  })

}
