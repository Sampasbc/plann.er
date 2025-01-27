import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";

export async function getParticipant(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId', {
    schema: {
      params: z.object({
        participantId: z.string().uuid(),
      })
    }
  }, async (request) => {

    const { participantId } = request.params

    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
      select: {
        name: true,
        email: true,
        is_confirmed: true,
        is_owner: true,
        trip_id: true,
      }
    })

    if (!participant) {
      throw new ClientError('The participant you\'re looking for does not exist.')
    }

    return { participant }
  })

}
