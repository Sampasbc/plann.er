import { Day } from "../../components/day";
import { Activity } from "../../components/activity";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface DayType {
  activities: Array<ActivitiesType>
  date: Date
}

interface ActivitiesType {
  id: string
  title: string
  is_done: boolean
  occurs_at: Date
  // trip_is: string
}

interface AvtivitiesProps {
  reMount: boolean
  removeActivity: (id: string) => void
}

export function Activities({
  reMount,
  removeActivity
}: AvtivitiesProps) {

  const { tripId } = useParams()
  const [days, setDays] = useState<Array<DayType>>()

  useEffect(() => {
    api.get(`/trips/${tripId}/activities/get`).then(response => setDays(response.data.activities))
  }, [tripId, reMount])

  // useEffect(() => {

  //   console.log(days && days[26].activities)
  // }, [days])

  return (
    <div className="flex flex-col gap-8">

      {days && days.map(day => {
        const activities = day.activities
        const hasActivities = activities.length > 0

        return (
          <Day
            key={day.date.toString()}
            date={day.date}
            hasActivities={hasActivities}
          >
            {activities.map(activity => {
              return (
                <Activity
                  key={activity.id}
                  activityId={activity.id}
                  title={activity.title}
                  isDone={activity.is_done}
                  occursAt={activity.occurs_at}
                  removeActivity={removeActivity}
                />
              )
            })}
          </Day>
        )
      })}

    </div>
  )
}