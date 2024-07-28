import { format } from "date-fns";
import { ReactNode } from "react";

interface DayProps {
  children: ReactNode
  date: Date
  hasActivities: boolean
}

export function Day({
  children,
  date,
  hasActivities
}: DayProps) {

  const currentDay = 'w-full space-y-3 opacity-100';
  const notCurrentDay = 'w-full space-y-3 opacity-60';

  const formatedDayNumber = format(date, 'MMM').concat(' ').concat(format(date, 'dd'))
  const formatedDayName = format(date, 'EEEE')

  function checkIfCurrentDay(day: Date) {
    const today = new Date()

    if (format(day, 'dd') == format(today, 'dd')) {
      return currentDay
    }
    return notCurrentDay
  }

  return (
    <div>
      {/* Day */}
      <div className={checkIfCurrentDay(date)}>

        {/* day title */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl text-zinc-300 font-semibold" >{formatedDayNumber}</span>
          <span className="text-xs text-zinc-500 leading-5" >{formatedDayName}</span>
        </div>

        {/* activity */}
        {!hasActivities && (
          <div>
            <span className="text-sm text-zinc-500" >No activity registered on this date.</span>
          </div>
        )}

        {children}

      </div>
    </div>
  )
}
