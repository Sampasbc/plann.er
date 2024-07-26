import { CircleCheck, CircleDashed } from "lucide-react"

interface GuestProps {
  isConfirmed: boolean
  name: string
  email: string
}

export function Guest({
  isConfirmed,
  name,
  email
}: GuestProps) {




  return (
    <div>
      {/* single guest */}
      <div className="flex items-center justify-between" >
        <div className="flex flex-1 flex-col gap-[6px] max-w-60">
          <span className="text-base text-zinc-100" >{name}</span>
          <span className="text-sm text-zinc-400 truncate" >{email}</span>
        </div>
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
  )
}
