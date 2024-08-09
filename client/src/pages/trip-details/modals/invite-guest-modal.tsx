import { LoaderCircle, Mail, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../../../components/button";

interface InviteGuestModalProps {
  isInviteGuestLoading: boolean
  closeInviteGuestModal: () => void
  inviteGuest: (guestEmail: string) => void
}

export function InviteGuestModal({
  isInviteGuestLoading,
  closeInviteGuestModal,
  inviteGuest
}: InviteGuestModalProps) {

  const [guestEmail, setGuestEmail] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    inviteGuest(guestEmail)
    setGuestEmail('')
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {/* CARD */}
      <div className='w-[33.75em] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

        {/* Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Invite a new guest</h2>
            <button>
              <X onClick={closeInviteGuestModal} className='size-5 text-zinc-400' />
            </button>
          </div>

          <p className='text-sm text-zinc-400'>
            Submit the new guest's email to send the invitation.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={event => handleSubmit(event)} className='space-y-3'>

          <div className='space-y-2'>
            {/* Input Guest Email*/}
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <Mail className='text-zinc-400 size-5' />
              <input
                type="text"
                name="email"
                placeholder="New guest email"
                className='bg-transparent text-base placeholder-zinc-400 outline-none flex-1'
                onChange={event => setGuestEmail(event.target.value)}
              />
            </div>



          </div>

          <Button disabled={isInviteGuestLoading} variant="primary" size="medium" width="full">
            Invite guest
            {isInviteGuestLoading && (
              <LoaderCircle className="size-5 loading" />
            )}
          </Button>
        </form>

      </div>
    </div>
  )
}