import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function getLink(app: FastifyInstance) {

  // POST request
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/links/get', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      })
    },
  }, async (request) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        links: true,
      }
    })

    // Validate if trip exists
    if (!trip) {
      throw new Error('The trip you\'re trying to look for links does not exist.')
    }

    return { links: trip.links }

  })
}
