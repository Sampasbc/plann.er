import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean
  openGuestInput: () => void
  closeGuestInput: () => void
  enabledInput: string
  disabledInput: string
  setDestination: (destination: string) => void
  setDateRange: (dates: DateRange | undefined) => void
  dateRange: DateRange | undefined
}

export function DestinationAndDateStep({
  closeGuestInput,
  isGuestInputOpen,
  openGuestInput,
  enabledInput,
  disabledInput,
  setDestination,
  setDateRange,
  dateRange
}: DestinationAndDateStepProps) {

  // const initialRange = undefined;

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    return setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false);
  }

  const displayDate =
    dateRange &&
      dateRange.from ?
      `${format(dateRange.from, 'MMM dd')}
      ${dateRange.to ? `to ${format(dateRange.to, 'MMM dd')}` : ''}`
      : 'When ?';

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-5">
      <div className='flex items-center gap-2 flex-1'>
        <MapPin className="size-5 text-zinc-400" />
        <input onChange={event => setDestination(event.target.value)} required disabled={isGuestInputOpen} type="text"
          placeholder="Where are you traveling to ?"
          className={isGuestInputOpen ? disabledInput + ' flex-1' : enabledInput + ' flex-1'} />
      </div>

      <button onClick={openDatePicker} disabled={isGuestInputOpen} className='flex items-center gap-2 text-left text-zinc-400'>
        <Calendar className="size-5 text-zinc-400" />
        <span className={isGuestInputOpen ? disabledInput : enabledInput} >
          {displayDate}
        </span>
      </button>

      {/* Divider */}
      <div className='w-px h-6 bg-zinc-800'></div>

      {/* Button State */}
      {isGuestInputOpen ? (
        <Button onClick={closeGuestInput} type="button" variant="secondary" size="small">
          Change location/date
          <Settings2 className="size-5 text-zinc-200" />
        </Button>
      ) : (
        <Button onClick={openGuestInput} type="submit" variant="primary" size="small">
          Continue
          <ArrowRight className="size-5 text-lime-950" />
        </Button>
      )}

      {/* Date Picker Modal*/}
      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          {/* CARD */}
          <div className='rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

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

          </div>

        </div>
      )}

    </div>
  )
}