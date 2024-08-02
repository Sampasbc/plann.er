import { Calendar, LoaderCircle, MapPin, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";

interface NewLinkProps {
  isUpdatingTripLoading: boolean
  closeUpdateTripModal: () => void
  updateTrip: (event: FormEvent<HTMLFormElement>, destination: string, date: DateRange | undefined, tripId: string | undefined) => void
}

export function UpdateTripModal({
  isUpdatingTripLoading,
  closeUpdateTripModal,
  updateTrip,
}: NewLinkProps) {

  const { tripId } = useParams()
  const [destination, setDestination] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayDate =
    dateRange &&
      dateRange.from ?
      `${format(dateRange.from, 'MMM dd')}
    ${dateRange.to ? `to ${format(dateRange.to, 'MMM dd')}` : ''}`
      : 'When ?';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {/* CARD */}
      <div className='w-[33.75em] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

        {/* Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Update location or date</h2>
            <button>
              <X onClick={closeUpdateTripModal} className='size-5 text-zinc-400' />
            </button>
          </div>
          <p className='text-sm text-zinc-400'>
            Fill in only the fields you want to update.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={event => updateTrip(event, destination, dateRange, tripId)} className='space-y-3'>

          <div className='space-y-2'>

            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <MapPin className="size-5 text-zinc-400" />
              <input onChange={event => setDestination(event.target.value)} type="text"
                placeholder="Where are you traveling to ?"
                className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1' />
            </div>

            <button type="button" onClick={openDatePicker} className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 w-full'>
              <Calendar className="size-5 text-zinc-400" />
              <span className="bg-transparent text-lg text-zinc-400 outline-none" >
                {displayDate}
              </span>
            </button>

          </div>

          <Button disabled={isUpdatingTripLoading} variant="primary" size="medium" width="full">
            Update trip
            {isUpdatingTripLoading && (
              <LoaderCircle className="size-5 loading" />
            )}
          </Button>
        </form>

      </div>

      {/* Date Picker Modal*/}
      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          {/* CARD */}
          <div className='flex flex-col rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

            {/* Title */}
            <div className='space-y-2'>
              <div className='flex items-center justify-between gap-2'>
                <h2 className='text-lg font-semibold'>Select date</h2>
                <button>
                  <X onClick={closeDatePicker} className='size-5 text-zinc-400' />
                </button>
              </div>
            </div>

            {/* Picker */}
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              showOutsideDays
              fixedWeeks
            />

            <Button onClick={closeDatePicker} variant={!dateRange ? "disabled" : "primary"} size="small" width="full" disabled={!dateRange} className="justify-self-end">
              Confirm
            </Button>

          </div>

        </div>
      )}

    </div>
  )
}