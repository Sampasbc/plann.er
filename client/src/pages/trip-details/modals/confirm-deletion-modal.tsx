import { X } from "lucide-react";
import { Button } from "../../../components/button";

interface ConfirmDeletionModalProps {
  onClick: () => void
  removeLink: (linkId: string) => void
  closeConfirmDeletionModal: () => void
}

export function ConfirmDeletionModal({
  closeConfirmDeletionModal,
  onClick,
}: ConfirmDeletionModalProps) {


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {/* CARD */}
      <div className='w-[33.75em] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

        {/* Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Are you sure you want to remove this link?</h2>
            <button>
              <X onClick={closeConfirmDeletionModal} className='size-5 text-zinc-400' />
            </button>
          </div>

          <p className='text-sm text-zinc-400'>
            This will remove the link for everyone on this trip.
          </p>
        </div>

        <div className='flex items-center gap-2'>

          <Button onClick={closeConfirmDeletionModal} variant="secondary" size="medium" width="full">
            Cancel
          </Button>

          <Button onClick={onClick} variant="danger" size="medium" width="full">
            Remove link
            {/* {isRemoveLinkLoading && (
              <LoaderCircle className="size-5 loading" />
            )} */}
          </Button>

        </div>


      </div>
    </div>
  )
}