import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";

export async function createActivity(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/activities/create', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      }),
      body: z.object({
        title: z.string().min(3),
        occurs_at: z.coerce.date(),
      })
    },
  }, async (request) => {
    const { tripId } = request.params
    const { title, occurs_at } = request.body


    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    })

    // Validate if trip exists
    if (!trip) {
      throw new ClientError('The trip you\'re trying to add an activity does not exist.')
    }

    // Format dates before validation
    const formatedEndDate = dayjs(trip.ends_at).format('YYYY-MM-DD')
    const formatedStartDate = dayjs(trip.starts_at).format('YYYY-MM-DD')
    const formatedOccursAt = dayjs(occurs_at).format('YYYY-MM-DD')


    // Validate if activity occurs on trip time period
    if (dayjs(formatedOccursAt).isAfter(formatedEndDate) || dayjs(formatedOccursAt).isBefore(formatedStartDate)) {
      throw new ClientError('The activity must be between the trip time period.')
    }

    const activity = await prisma.activity.create({
      data: {
        title,
        occurs_at,
        trip_id: tripId,
      }
    })

    return {
      message: 'Atividade registrada com sucesso!',
      name: activity.title,
      activity_id: activity.id,
    }

  })
}
