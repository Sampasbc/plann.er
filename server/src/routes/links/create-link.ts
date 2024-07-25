import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function createLink(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/links/create', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      }),
      body: z.object({
        title: z.string().min(3),
        url: z.string().url(),
      })
    },
  }, async (request) => {
    const { tripId } = request.params
    const { title, url } = request.body

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    })

    // Validate if trip exists
    if (!trip) {
      throw new Error('The trip you\'re trying to add a link does not exist.')
    }

    const link = await prisma.link.create({
      data: {
        title,
        url,
        trip_id: tripId,
      }
    })

    return {
      message: 'Link registrado com sucesso!',
      name: link.title,
      url: link.url,
      link_id: link.id,
    }

  })
}
