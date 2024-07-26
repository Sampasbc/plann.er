import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestStepProps {
  openGuestModal: () => void
  emailsToInvite: string[]
  openConfirmTripModal: () => void
}

export function InviteGuestStep({
  openGuestModal,
  emailsToInvite,
  openConfirmTripModal,
}: InviteGuestStepProps) {

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type="button" onClick={openGuestModal} className='flex items-center gap-2 flex-1'>
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-lg text-zinc-400">{emailsToInvite.length > 1 ? (`${emailsToInvite.length} people invited`) : (`1 person invited`)}</span>
        ) : (
          <span className="text-lg text-zinc-400">Who is traveling with you ?</span>
        )}
      </button>

      <Button onClick={openConfirmTripModal} variant="primary" size="small">
        Confirm trip
        <ArrowRight className="size-5 text-lime-950" />
      </Button>
    </div>
  )
}