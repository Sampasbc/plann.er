import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";

export async function updateActivity(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().put('/trips/:tripId/activities/:activityId/update', {
    schema: {
      params: z.object({
        activityId: z.string().uuid(),
        tripId: z.string().uuid(),
      }),
      body: z.object({
        title: z.string().min(3).optional(),
        occurs_at: z.coerce.date().optional(),
        is_done: z.boolean().optional(),
      })
    },
  }, async (request) => {
    const { activityId, tripId } = request.params
    const { title, occurs_at, is_done } = request.body

    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    })

    const activity = await prisma.activity.findUnique({
      where: { id: activityId }
    })

    // Validate if trip exists
    if (!trip) {
      throw new ClientError('The trip you\'re trying to add an activity does not exist.')
    }

    // Validate if activity exists
    if (!activity) {
      throw new ClientError('The trip you\'re trying to add an activity does not exist.')
    }

    // If an occurs_at is specified
    if (occurs_at !== undefined) {
      // Validate if activity occurs on trip time period
      if (dayjs(occurs_at).isAfter(trip.ends_at) || dayjs(occurs_at).isBefore(trip.starts_at)) {
        throw new ClientError('The activity must be between the trip time period.')
      }
    }

    if (activity.title == title || activity.occurs_at == occurs_at || activity.is_done == is_done) {
      throw new ClientError('The properties you are trying to change can\'t have the same values.')
    }

    type updateDataType = {
      title?: string
      occurs_at?: Date
      is_done?: boolean
    }

    const updateData: updateDataType = {}

    if (title !== undefined) {
      updateData.title = title
    }

    if (occurs_at !== undefined) {
      updateData.occurs_at = occurs_at
    }

    if (is_done !== undefined) {
      updateData.is_done = is_done
    }

    const activityNew = await prisma.activity.update({
      where: { id: activityId },
      data: updateData
    })

    return {
      message: 'Activity updated successfully!',
      activity_id: activityNew.id,
      name: activityNew.title,
      is_done: activityNew.is_done,
      occurs_at: activityNew.occurs_at,
    }

  })
}
