import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";

export function Guests() {
  
  return (
    <div className="flex flex-col gap-6" >

      <span className="text-zinc-50 text-xl font-semibold" >
        Convidados
      </span>

      {/* List */}
      <div className="space-y-5">

        {/* single guest */}
        <div className="flex items-center justify-between" >
          <div className="flex flex-1 flex-col gap-[6px] max-w-60">
            <span className="text-base text-zinc-100" >Jessica White</span>
            <span className="text-sm text-zinc-400 truncate" >jessica.white@gmail.com</span>
          </div>
          <button>
            <CircleDashed className="text-zinc-400 size-5" />
          </button>
        </div>

        {/* single guest */}
        <div className="flex items-center justify-between" >
          <div className="flex flex-1 flex-col gap-[6px] max-w-60">
            <span className="text-base text-zinc-100" >Wilfred Dickens</span>
            <span className="text-sm text-zinc-400 truncate" >dickens.wilfred@gmail.com</span>
          </div>
          <button>
            <CircleCheck className="size-5 text-lime-300" />
          </button>
        </div>

        {/* single guest */}
        <div className="flex items-center justify-between" >
          <div className="flex flex-1 flex-col gap-[6px] max-w-60">
            <span className="text-base text-zinc-100" >Wilfred Dickens</span>
            <span className="text-sm text-zinc-400 truncate" >dickens.wilfred@gmail.com</span>
          </div>
          <button>
            <CircleCheck className="size-5 text-lime-300" />
          </button>
        </div>

        {/* single guest */}
        <div className="flex items-center justify-between" >
          <div className="flex flex-1 flex-col gap-[6px] max-w-60">
            <span className="text-base text-zinc-100" >Wilfred Dickens</span>
            <span className="text-sm text-zinc-400 truncate" >dickens.wilfred@gmail.com</span>
          </div>
          <button>
            <CircleCheck className="size-5 text-lime-300" />
          </button>
        </div>

        {/* single guest */}
        <div className="flex items-center justify-between" >
          <div className="flex flex-1 flex-col gap-[6px] max-w-60">
            <span className="text-base text-zinc-100" >Wilfred Dickens</span>
            <span className="text-sm text-zinc-400 truncate" >dickens.wilfred@gmail.com</span>
          </div>
          <button>
            <CircleCheck className="size-5 text-lime-300" />
          </button>
        </div>

      </div>

      <Button variant='secondary' size="medium"  >
        <UserCog className="size-5 text-zinc-200" />
        Gerenciar convidados
      </Button>

    </div>

  )
}