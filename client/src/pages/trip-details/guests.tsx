import { UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { Guest } from "../../components/guest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface ParticipantType {
  id: string
  is_confirmed: boolean
  name: string
  email: string
}

export function Guests() {

  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Array<ParticipantType>>()

  useEffect(() => {
    api.get(`/trips/${tripId}/participants/get`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="flex flex-col gap-6" >

      <span className="text-zinc-50 text-xl font-semibold" >
        Convidados
      </span>

      {/* List */}
      <div className="space-y-5">

        {participants && participants.map((participant, index) => {
          return (
            <Guest
              key={participant.id}
              index={index}
              isConfirmed={participant.is_confirmed}
              name={participant.name}
              email={participant.email}
            />
          )
        })}
        {/* single guest */}

      </div>

      <Button variant='secondary' size="medium"  >
        <UserCog className="size-5 text-zinc-200" />
        Gerenciar convidados
      </Button>

    </div>

  )
}