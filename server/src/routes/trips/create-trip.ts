import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from "nodemailer";
import { z } from 'zod';
import { getMailClient } from "../../lib/mail";
import { prisma } from "../../lib/prisma";
import { LOCAL_IP, SERVER_PORT } from "../../server";

export async function createTrip(app: FastifyInstance) {

  // POST request
  app.withTypeProvider<ZodTypeProvider>().post('/trips', {
    schema: {
      body: z.object({
        destination: z.string().min(4),
        starts_at: z.coerce.date(),
        ends_at: z.coerce.date(),
        owner_name: z.string(),
        owner_email: z.string().email(),
        emails_to_invite: z.array(z.string().email()),
      })
    },
  }, async (request) => {
    const { destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite } = request.body;

    // Start date validation
    if (dayjs(starts_at).isBefore(new Date())) {
      throw new Error('Invalid trip start date.')
    }

    // End date validation
    if (dayjs(ends_at).isBefore(starts_at)) {
      throw new Error('Invalid trip end date.')
    }

    // await prisma.$transaction(tx => {})

    // Create new Trip and Owner on Data Base
    const trip = await prisma.trip.create({
      data: {
        destination,
        starts_at,
        ends_at,
        participants: {
          createMany: {
            data: [
              {
                name: owner_name,
                email: owner_email,
                is_owner: true,
                is_confirmed: true
              },
              ...emails_to_invite.map(email => {
                return { email }
              })
            ]
          }
        }
      }
    })

    // Email handler
    const mail = await getMailClient()

    const confirmationLink = `http://${LOCAL_IP}:${SERVER_PORT}/trips/${trip.id}/confirm`

    const message = await mail.sendMail({
      from: {
        name: 'Equipe Plann.er',
        address: 'team@plann.er'
      },
      to: {
        name: owner_name,
        address: owner_email,
      },
      subject: `Conrifm Trip to ${destination}`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>You requested the creation of a trip to <strong>${destination}</strong> on the dates of <strong>${dayjs(starts_at).format('MMM D YYYY')}</strong> to <strong>${dayjs(ends_at).format('MMM D YYYY')}</strong>.</p>
          <p></p>
          <p>To confirm your trip, click on the link below:</p>
          <p></p>
          <p>
            <a href=${confirmationLink}>
              Confirm trip
            </a>
          </p>
          <p></p>
          <p>If you don't know what this email is about, just ignore it.</p>
        </div>
      `.trim()
    })

    console.log(nodemailer.getTestMessageUrl(message))

    return {
      message: 'Registro realizado com sucesso!',
      tripId: trip.id
    }

  })
}
