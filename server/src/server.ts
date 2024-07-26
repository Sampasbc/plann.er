import fastify from "fastify";
import cors from "@fastify/cors"
import { createTrip } from "./routes/trips/create-trip";
import { confirmTrip } from "./routes/trips/confirm-trip";
import { confirmParticipation } from "./routes/participants/confirm-participation";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createActivity } from "./routes/activities/create-activity";
import { getActivity } from "./routes/activities/get-activities";
import { createLink } from "./routes/links/create-link";
import { getLink } from "./routes/links/get-links";
import { getParticipants } from "./routes/participants/get-participants";
import { inviteParticipant } from "./routes/participants/create-invite";
import { updateTrip } from "./routes/trips/update-trip";
import { getTripDetails } from "./routes/trips/get-trip-details";
import { getParticipant } from "./routes/participants/get-participant";
import { updateParticipant } from "./routes/participants/update-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";
import { formatRemoveHTTP } from "./lib/format-url";
import { updateActivity } from "./routes/activities/update-activity";

const app = fastify()

app.register(cors, {
  origin: [
    `${env.CLIENT_BASE_URL}:${env.CLIENT_PORT}`,
    `${env.API_BASE_URL}:${env.PORT}`,
  ]
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.get('/', () => {
  return 'Index Page'
})

// POST '/trips'
app.register(createTrip)

// GET '/trips/:tripId/confirm'
app.register(confirmTrip)

// GET '/trips/:tripId/details'
app.register(getTripDetails)

// PUT '/trips/:tripId/update'
app.register(updateTrip)

// GET '/participants/:participantId/confirm'
app.register(confirmParticipation)

// GET '/trips/:tripId/participants/get'
app.register(getParticipants)

// GET '/participants/:participantId'
app.register(getParticipant)

// GET '/participants/:participantId/update'
app.register(updateParticipant)

// GET '/trips/:tripId/participants/invite'
app.register(inviteParticipant)

// POST '/trips/:tripId/activities/create'
app.register(createActivity)

// GET '/trips/:tripId/activities/get'
app.register(getActivity)

// POST '/trips/:tripId/activities/:activityId/update'
app.register(updateActivity)

// POST '/trips/:tripId/links/create'
app.register(createLink)


// POST '/trips/:tripId/links/get'
app.register(getLink)


app.listen({ port: 3333, host: formatRemoveHTTP(env.API_BASE_URL, 'http') }).then(() => {
  console.log(`Server running!\nAccess on ${env.API_BASE_URL}:${env.PORT}`)
})