import { format } from "date-fns";
import { CircleCheck, CircleDashed } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/axios";
import { useParams } from "react-router-dom";

interface ActivityProps {
  activityId: string
  title: string
  isDone: boolean
  occursAt: Date
}

export function Activity({
  activityId,
  title,
  isDone,
  occursAt,
}: ActivityProps) {

  const { tripId } = useParams()
  const [isDoneState, setIsDoneState] = useState(isDone)

  const formatedOccursAt = format(occursAt, 'p')

  const updateActivity = async () => {

    try {
      await api.put(`/trips/${tripId}/activities/${activityId}/update`, {
        is_done: !isDoneState,
      });
    } catch (error) {
      console.error('Failed to update activity:', error);
    }

    setIsDoneState(!isDoneState)
  };

  return (
    <div>

      {/* activity */}
      <div className="space-y-3">

        {/* Task */}
        <div className="h-10 rounded-xl px-4 flex justify-between items-center gap-3 bg-zinc-900 shadow-shape">
          <button onClick={() => updateActivity()}>
            {isDoneState ? (
              <CircleCheck className="size-5 text-lime-300" />
            ) : (
              <CircleDashed className="size-5 text-zinc-400" />
            )}
          </button>
          <span className="flex-1 text-base leading-5 text-zinc-100">{title}</span>
          <span className="text-zinc-400 text-sm leading-5" >{formatedOccursAt}</span>
        </div>


      </div>

    </div>
  )
}