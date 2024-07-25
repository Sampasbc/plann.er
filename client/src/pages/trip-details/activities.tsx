import { CircleCheck, CircleDashed } from "lucide-react";

export function Activities() {


  const currentDay = 'w-full space-y-3 opacity-100';
  const notCurrentDay = 'w-full space-y-3 opacity-60';

  return (
    <div className="flex flex-col gap-8">

      {/* Day */}
      <div className={notCurrentDay}>

        {/* day title */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl text-zinc-300 font-semibold" >Dia 17</span>
          <span className="text-xs text-zinc-500 leading-5" >Sábado</span>
        </div>

        {/* activity */}
        <div>
          <span className="text-sm text-zinc-500" >Nenhuma atividade cadastrada nessa data</span>
        </div>

      </div>

      {/* Day */}
      <div className={currentDay}>

        {/* day title */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl text-zinc-300 font-semibold" >Dia 19</span>
          <span className="text-xs text-zinc-500 leading-5" >Segunda-feira</span>
        </div>

        {/* activity */}
        <div className="space-y-3">

          {/* Task */}
          <div className="h-10 rounded-xl px-4 flex justify-between items-center gap-3 bg-zinc-900 shadow-shape">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="flex-1 text-base leading-5 text-zinc-100">Academia em grupo</span>
            <span className="text-zinc-400 text-sm leading-5" >08:00h</span>
          </div>

          {/* Task */}
          <div className="h-10 rounded-xl px-4 flex justify-between items-center gap-3 bg-zinc-900 shadow-shape">
            <CircleDashed className="size-5 text-zinc-400" />
            <span className="flex-1 text-base leading-5 text-zinc-100">Almoço</span>
            <span className="text-zinc-400 text-sm leading-5" >12:00h</span>
          </div>

          {/* Task */}
          <div className="h-10 rounded-xl px-4 flex justify-between items-center gap-3 bg-zinc-900 shadow-shape">
            <CircleDashed className="size-5 text-zinc-400" />
            <span className="flex-1 text-base leading-5 text-zinc-100">Jantar</span>
            <span className="text-zinc-400 text-sm leading-5" >21:00h</span>
          </div>

        </div>

      </div>

    </div>
  )
}