import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from "nodemailer";
import { z } from 'zod';
import { getMailClient } from "../../lib/mail";
import { prisma } from "../../lib/prisma";
import { LOCAL_IP, SERVER_PORT } from "../../server";

export async function confirmTrip(app: FastifyInstance) {

  // POST request
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      })
    },
  }, async (request, reply) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      // Include the table of participants on this trip
      include: {
        participants: {
          where: {
            is_owner: false,
          }
        }
      }
    })

    // Throw error if trip is not on DB
    if (!trip) {
      throw new Error('Trip not found.')
    }

    // Redirect if trip is alredy confirmed
    if (trip.is_confirmed) {
      return reply.redirect(`http://localhost:5173/trips/${tripId}`)
    }

    await prisma.trip.update({
      where: { id: tripId },
      data: { is_confirmed: true },
    })

    const mail = await getMailClient()

    // Send all emails at once
    await Promise.all(
      trip.participants.map(async (participant) => {

        const confirmationLink = `http://${LOCAL_IP}:${SERVER_PORT}/participants/${participant.id}/confim`

        const message = await mail.sendMail({
          from: {
            name: 'Equipe Plann.er',
            address: 'team@plann.er'
          },
          to: participant.email,

          subject: `Conrifm your presence on the trip to ${trip.destination}`,

          html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
              <p>You were invited to participate on a trip to <strong>${trip.destination}</strong> on the dates of <strong>${dayjs(trip.starts_at).format('MMM D YYYY')}</strong> to <strong>${dayjs(trip.ends_at).format('MMM D YYYY')}</strong>.</p>
              <p></p>
              <p>To confirm your presence on this trip, click on the link below:</p>
              <p></p>
              <p>
                <a href=${confirmationLink}>
                  Confirm presence
                </a>
              </p>
              <p></p>
              <p>If you don't know what this email is about, just ignore it.</p>
            </div>
          `.trim()
        })

        console.log(nodemailer.getTestMessageUrl(message))

      })
    )

    return reply.redirect(`http://localhost:5173/trips/${tripId}`)
  })
}
