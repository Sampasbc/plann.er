import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface DestinationAndDateHeaderProps {
  openUpdateTripModal: () => void
  reMount: boolean
}

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader({
  openUpdateTripModal,
  reMount,
}: DestinationAndDateHeaderProps) {

  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  useEffect(() => {

    async function fetchTripDetails() {
      try {
        const response = await api.get(`/trips/${tripId}/details`)
        setTrip(response.data.trip)
        if (response.status !== 200) {
          throw new Error('Connection Error!')
        }
      } catch (error) {
        window.alert(error)
      }
    }

    fetchTripDetails()
  }, [tripId, reMount])

  const displayDate =
    trip && trip?.starts_at ?
      `${format(trip?.starts_at, 'MMM dd')} ${trip?.ends_at ? `to ${format(trip?.ends_at, 'MMM dd')}` : ''}` : '';


  return (
    <div className="px-4 h-16 w-full rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">

      {/* Location */}
      <div className="flex items-center gap-2 pl-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-base text-zinc-100" >{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">

        {/* Date */}
        <div className="flex items-center gap-2 pl-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-base text-zinc-100" >{displayDate}</span>
        </div>

        {/* Divider */}
        <div className='w-px h-6 bg-zinc-800'></div>

        {/* Button */}
        <Button onClick={() => openUpdateTripModal()} variant='secondary' >
          Change location/date
          <Settings2 className="size-5" />
        </Button>

      </div>

    </div>
  )
}