import { Calendar, Clock, LoaderCircle, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../components/button";

interface NewActivityProps {
  isAddActivityLoading: boolean
  closeActivityModal: () => void
  addActivity: (event: FormEvent<HTMLFormElement>) => void
  setActivityTitle: (title: string) => void
  setActivityDate: (date: string) => void
  setActivityTime: (time: string) => void
}


export function NewActivityModal({
  isAddActivityLoading,
  closeActivityModal,
  addActivity,
  setActivityTitle,
  setActivityDate,
  setActivityTime
}: NewActivityProps) {

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {/* CARD */}
      <div className='w-[33.75em] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

        {/* Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Register activity</h2>
            <button>
              <X onClick={closeActivityModal} className='size-5 text-zinc-400' />
            </button>
          </div>

          <p className='text-sm text-zinc-400'>
            All guests can view the activities.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={event => addActivity(event)} className='space-y-3'>

          <div className='space-y-2'>
            {/* Input Name*/}
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <Tag className='text-zinc-400 size-5' />
              <input
                type="text"
                name="activity_name"
                placeholder="What is the activity?"
                className='bg-transparent text-base placeholder-zinc-400 outline-none flex-1'
                onChange={event => setActivityTitle(event.target.value)}
              />
            </div>

            <div className="flex gap-2">
              {/* Input Date*/}
              <div className='box-border h-14 w-[344px] px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 '>
                <Calendar className='text-zinc-400 size-5' />
                <input
                  type="date"
                  name="activity_date"
                  placeholder="Select date"
                  className='bg-transparent text-base placeholder-zinc-400 outline-none flex-1'
                  onChange={event => setActivityDate(event.target.value)}
                />
              </div>

              {/* Input Time*/}
              <div className='h-14 w-[140px] px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <Clock className='text-zinc-400 size-5' />
                <input
                  type="time"
                  name="activity_time"
                  placeholder="Time"
                  className='bg-transparent text-base placeholder-zinc-400 outline-none flex-1'
                  onChange={event => setActivityTime(event.target.value)}
                />
              </div>
            </div>


          </div>

          <Button type='submit' variant="primary" size="medium" width='full'>
            Save Activity
            {isAddActivityLoading && (
              <LoaderCircle className="size-5 loading" />
            )}
          </Button>
        </form>

      </div>
    </div>
  )
}