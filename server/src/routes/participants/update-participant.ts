import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function updateParticipant(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().put('/participants/:participantId/update', {
    schema: {
      params: z.object({
        participantId: z.string().uuid(),
      }),
      body: z.object({
        name: z.string(),
      })
    }
  }, async (request) => {

    const { participantId } = request.params
    const { name } = request.body

    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    })

    if (!participant) {
      throw new Error('The participant you\'re looking for does not exist.')
    }

    if (participant.name == name) {
      throw new Error('The participant already has the current name.')
    }

    await prisma.participant.update({
      where: { id: participantId },
      data: {
        name: name,
      }
    })

    return {
      message: 'Participant updated successfully.',
      id: participantId,
    }
  })

}
