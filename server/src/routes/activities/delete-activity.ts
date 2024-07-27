import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";

export async function deleteActivity(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().delete('/activities/:activityId/delete', {
    schema: {
      params: z.object({
        activityId: z.string().uuid(),
      })
    },
  }, async (request, reply) => {
    const { activityId } = request.params

    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
    })

    // Validate if trip exists
    if (!activity) {
      throw new ClientError('The trip you\'re trying to add an activity does not exist.')
    }

    await prisma.activity.delete({
      where: { id: activityId }
    })

    reply.status(204).send()

  })
}
