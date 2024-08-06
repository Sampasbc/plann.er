import { Minus, UserCog, UserPlus } from "lucide-react";
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

  const [isManageMode, setIsManageMode] = useState<boolean>(false)

  useEffect(() => {
    api.get(`/trips/${tripId}/participants/get`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="flex flex-col gap-6" >

      <span className="text-zinc-50 text-xl font-semibold" >
        Guests
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
              isManageMode={isManageMode}
            />
          )
        })}
        {/* single guest */}

      </div>
      <div className="flex flex-col gap-3">
        {isManageMode && (
          <Button onClick={() => console.log('invite')} variant='primary' size="medium" >
            <UserPlus className="size-5" />
            Invite a new guest
          </Button>
        )}

        <Button onClick={() => setIsManageMode(!isManageMode)} variant='secondary' size="medium" state={isManageMode ? "active_secondary" : "default"}>
          {!isManageMode ? (
            <>
              <UserCog className="size-5" />
              Manage guests
            </>
          ) : (
            <>
              <Minus className="size-5" />
              Stop managing guests
            </>
          )}
        </Button>
      </div>

    </div>

  )
}