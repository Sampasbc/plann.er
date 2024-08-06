import { CircleCheck, CircleDashed, Edit3, XCircleIcon } from "lucide-react"
import { ConfirmDeletionModal } from "../pages/trip-details/modals/confirm-deletion-modal"
import { useState } from "react"

interface GuestProps {
  index: number
  isConfirmed: boolean
  name: string
  email: string
  isManageMode: boolean
}

export function Guest({
  index,
  isConfirmed,
  name,
  email,
  isManageMode,
}: GuestProps) {

  const [isConfirmDeletionModalOpen, setIsConfirmDeletionModalOpen] = useState(false)

  function openConfirmDeletionModal() {
    setIsConfirmDeletionModalOpen(true)
  }

  function closeConfirmDeletionModal() {
    setIsConfirmDeletionModalOpen(false)
  }

  return (
    <div>
      {/* single guest */}
      <div className="flex items-center justify-between" >
        <div className="flex flex-1 flex-col gap-[6px] max-w-60">
          <div className="flex items-center gap-2" >
            {isManageMode && (
              <button>
                <Edit3 className="text-zinc-600 size-5 opacity-100 hover:opacity-100 hover:text-zinc-400 managed"
                  onClick={() => console.log('delete')}
                />
              </button>
            )}
            <span className="text-base text-zinc-100" >{name ?? `Guest ${index}`}</span>
          </div>
          <span className="text-sm text-zinc-400 truncate" >{email}</span>
        </div>
        <div className=" flex gap-2">
          {isManageMode && (
            <button>
              <XCircleIcon className="text-zinc-400 size-5 opacity-50 hover:opacity-100 hover:text-red-600"
                onClick={() => openConfirmDeletionModal()}
              />
            </button>
          )}

          {isConfirmed ? (
            <button>
              <CircleCheck className="size-5 text-lime-300" />
            </button>

          ) : (
            <button>
              <CircleDashed className="text-zinc-400 size-5" />
            </button>
          )}
        </div>
      </div>

      {isConfirmDeletionModalOpen && (
        <ConfirmDeletionModal
          onClick={() => console.log('bip')}
          closeConfirmDeletionModal={closeConfirmDeletionModal}
          context={"guest"}
        />
      )}
    </div>
  )
}
