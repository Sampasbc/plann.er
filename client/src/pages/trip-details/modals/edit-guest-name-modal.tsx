import { useState } from "react";
import { Button } from "../../../components/button";
import { User, X } from "lucide-react";

interface EditGuestNameModalProps {
  closeEditGuestNameModal: () => void
  handleUpdateGuestName: (name: string) => void
}

export function EditGuestNameModal({
  closeEditGuestNameModal,
  handleUpdateGuestName,
}: EditGuestNameModalProps) {

  const [newName, setNewName] = useState('')

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {/* CARD */}
      <div className='w-[33.75em] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

        {/* Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Edit guest name</h2>
            <button>
              <X onClick={() => closeEditGuestNameModal()} className='size-5 text-zinc-400' />
            </button>
          </div>
          <p className='text-sm text-zinc-400'>
            This will update the name for everyone on this trip.
          </p>
        </div>

        <div className='flex flex-col jutify-center gap-3'>

          <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
            <User className='text-zinc-400 size-5' />
            <input
              onChange={event => setNewName(event.target.value)}
              type="text"
              name="name"
              placeholder="New name"
              className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
            />
          </div>

          <Button onClick={() => handleUpdateGuestName(newName)} variant="primary" size="medium" width="full">
            Confirm new name
            {/* {isRemoveLinkLoading && (
              <LoaderCircle className="size-5 loading" />
            )} */}
          </Button>

        </div>


      </div>
    </div>
  )
}