import { Link2 } from "lucide-react";

interface LinkProps {
  title: string
  url: string
}

export function Link({
  title,
  url,
}: LinkProps) {

  return (
    <div className="flex items-center justify-between" >
      <div className="flex flex-1 flex-col gap-[6px] max-w-60">
        <span className="text-base text-zinc-100" >{title}</span>
        <a
          href={url}
          className="text-xs text-zinc-400 truncate hover:text-zinc-300" >
          {url}
        </a>
      </div>
      <button>
        <Link2 className="text-zinc-400 size-5" />
      </button>
    </div>
  )
}