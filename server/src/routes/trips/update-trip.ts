import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function updateTrip(app: FastifyInstance) {

  // POST request
  app.withTypeProvider<ZodTypeProvider>().put('/trips/:tripId/update', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      }),
      body: z.object({
        destination: z.string().min(4),
        starts_at: z.coerce.date(),
        ends_at: z.coerce.date(),
      })
    },
  }, async (request) => {
    const { tripId } = request.params
    const { destination, starts_at, ends_at } = request.body

    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    })

    if (!trip) {
      throw new Error('The trip you\'re looking for does not exist.')
    }

    // Start date validation
    if (dayjs(starts_at).isBefore(new Date())) {
      throw new Error('Invalid trip start date.')
    }

    // End date validation
    if (dayjs(ends_at).isBefore(starts_at)) {
      throw new Error('Invalid trip end date.')
    }

    // Create new Trip and Owner on Data Base
    await prisma.trip.update({
      where: { id: tripId },
      data: {
        destination,
        starts_at,
        ends_at,
      }
    })


    return {
      message: 'Your trip was updated successfully!',
      tripId: trip.id
    }

  })
}
