import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";

export async function updateTrip(app: FastifyInstance) {

  // POST request
  app.withTypeProvider<ZodTypeProvider>().put('/trips/:tripId/update', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      }),
      body: z.object({
        destination: z.string().min(4).optional(),
        starts_at: z.coerce.date().optional(),
        ends_at: z.coerce.date().optional(),
      })
    },
  }, async (request) => {
    const { tripId } = request.params
    const { destination, starts_at, ends_at } = request.body

    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    })

    if (!trip) {
      throw new ClientError('The trip you\'re looking for does not exist.')
    }

    const initialStartDate = trip?.starts_at

    // Start date validation
    if (starts_at && dayjs(starts_at).isBefore(initialStartDate)) {
      throw new ClientError('Invalid trip start date.')
    }

    // End date validation
    if (ends_at && dayjs(ends_at).isBefore(starts_at)) {
      throw new ClientError('Invalid trip end date.')
    }

    type updateDataType = {
      destination?: string
      starts_at?: Date
      ends_at?: Date
    }

    const updateData: updateDataType = {}

    if (destination !== undefined) {
      updateData.destination = destination
    }

    if (starts_at !== undefined) {
      updateData.starts_at = starts_at
    }

    if (ends_at !== undefined) {
      updateData.ends_at = ends_at
    }

    // Create new Trip and Owner on Data Base
    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: updateData
    })


    return {
      message: 'Your trip was updated successfully!',
      tripId: updatedTrip.id,
      destination: updatedTrip.destination,
      starts_at: updatedTrip.starts_at,
      ends_at: updatedTrip.ends_at
    }

  })
}