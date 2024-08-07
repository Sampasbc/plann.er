import { CircleCheck, CircleDashed, Edit3, XCircleIcon } from "lucide-react"
import { ConfirmDeletionModal } from "../pages/trip-details/modals/confirm-deletion-modal"
import { useState } from "react"
import { EditGuestNameModal } from "../pages/trip-details/modals/edit-guest-name-modal"

interface GuestProps {
  id: string
  index: number
  isConfirmed: boolean
  name: string
  email: string
  isManageMode: boolean
  removeGuest: (guestId: string) => void
  updateGuestName: (name: string, guestId: string) => void
}

export function Guest({
  id,
  index,
  isConfirmed,
  name,
  email,
  isManageMode,
  removeGuest,
  updateGuestName,
}: GuestProps) {

  const [isConfirmDeletionModalOpen, setIsConfirmDeletionModalOpen] = useState(false)
  const [isEditGuestNameModalOpen, setIsEditGuestNameModalOpen] = useState(false)

  function openConfirmDeletionModal() {
    setIsConfirmDeletionModalOpen(true)
  }

  function closeConfirmDeletionModal() {
    setIsConfirmDeletionModalOpen(false)
  }

  function handleDeletion(guestId: string) {
    removeGuest(guestId)
    closeConfirmDeletionModal()
  }

  function openEditGuestNameModal() {
    setIsEditGuestNameModalOpen(true)
  }

  function closeEditGuestNameModal() {
    setIsEditGuestNameModalOpen(false)
  }

  function handleUpdateGuestName(newName: string) {
    updateGuestName(newName, id)
    closeEditGuestNameModal()
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
                  onClick={() => openEditGuestNameModal()}
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
          onClick={() => handleDeletion(id)}
          closeConfirmDeletionModal={closeConfirmDeletionModal}
          context={"guest"}
        />
      )}

      {isEditGuestNameModalOpen && (
        <EditGuestNameModal
          handleUpdateGuestName={handleUpdateGuestName}
          closeEditGuestNameModal={closeEditGuestNameModal}
        />
      )}
    </div>
  )
}
