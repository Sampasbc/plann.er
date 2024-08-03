import { Link2, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { ConfirmDeletionModal } from "../pages/trip-details/modals/confirm-deletion-modal";

interface LinkProps {
  id: string
  title: string
  url: string
  removeLink: (linkId: string) => void
}

export function Link({
  id,
  title,
  url,
  removeLink,
}: LinkProps) {

  const [isShowingOptions, setIsShowingOptions] = useState<boolean>(false)
  const [isConfirmDeletion, setIsConfirmDeletion] = useState<boolean>(false)

  function closeConfirmDeletionModal() {
    setIsConfirmDeletion(false)
  }

  function openConfirmDeletionModal() {
    setIsConfirmDeletion(true)
  }

  async function copyToClipboard(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div className="flex items-center justify-between"
      onMouseEnter={() => setIsShowingOptions(true)}
      onMouseLeave={() => setIsShowingOptions(false)}
    >
      <div className="flex flex-1 flex-col gap-[6px] max-w-60">
        <span className="text-base text-zinc-100" >{title}</span>
        <a
          href={url}
          className="text-xs text-zinc-400 truncate hover:text-zinc-300" >
          {url}
        </a>
      </div>
      {isShowingOptions && (
        <button>
          <XCircleIcon className="text-zinc-400 size-5 opacity-50 hover:opacity-100 hover:text-red-600"
            onClick={() => openConfirmDeletionModal()}
          />
        </button>
      )}
      <button>
        <Link2 onClick={() => copyToClipboard(url)} className="text-zinc-400 size-5" />
      </button>

      {isConfirmDeletion && (
        <ConfirmDeletionModal
          onClick={() => removeLink(id)}
          closeConfirmDeletionModal={closeConfirmDeletionModal}
          context={"link"}
        />
      )}

    </div>
  )
}