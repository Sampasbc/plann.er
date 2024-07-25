import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";

export async function confirmParticipation(app: FastifyInstance) {

  // POST request
  app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId/confirm', {
    schema: {
      params: z.object({
        participantId: z.string().uuid(),
      })
    },
  }, async (request, reply) => {
    const { participantId } = request.params

    const invitedGuest = await prisma.participant.findUnique({
      where: {
        id: participantId,
      }
    })

    if (!invitedGuest) {
      throw new ClientError('Invited guest does not exist.')
    }

    if (invitedGuest.is_confirmed) {
      return reply.redirect(`http://localhost:5173/trips/${invitedGuest.trip_id}`)
    }

    await prisma.participant.update({
      where: { id: participantId },
      data: { is_confirmed: true }
    })

    return reply.redirect(`http://localhost:5173/trips/${invitedGuest.trip_id}`)
  })
}
