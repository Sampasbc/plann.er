import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { getMailClient } from "../../lib/mail";
import nodemailer from 'nodemailer'
import dayjs from "dayjs";
import { ClientError } from "../../errors/client-error";
import { env } from "../../env";

export async function inviteParticipant(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/participants/invite', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      }),
      body: z.object({
        email: z.string().email(),
      })
    },
  }, async (request) => {
    const { tripId } = request.params
    const { email } = request.body

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    })

    // Validate if trip exists
    if (!trip) {
      throw new ClientError('The trip you\'re trying to invite someone does not exist.')
    }

    const participant = await prisma.participant.create({
      data: {
        email,
        trip_id: tripId,
      }
    })

    const mail = await getMailClient()

    const confirmationLink = `${env.API_BASE_URL}:${env.PORT}/participants/${participant.id}/confirm`

    const message = await mail.sendMail({
      from: {
        name: 'Equipe Plann.er',
        address: 'team@plann.er'
      },
      to: participant.email,

      subject: `Confirm your presence on the trip to ${trip.destination}`,

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



    return {
      message: 'Invitation was sent successfully',
      id: participant.id,
    }

  })
}
