import { Mail, Plus, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface ConfirmTripModalProps {
  enabledInput: string
  destination: string
  dateRange: DateRange | undefined
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
}


export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  enabledInput,
  setOwnerEmail,
  setOwnerName,
  destination,
  dateRange
}: ConfirmTripModalProps) {

  const displayDate =
    dateRange &&
      dateRange.from ?
      `${format(dateRange.from, 'dd/MMM')} ${dateRange.to ? `to ${format(dateRange.to, 'dd/MMM')}` : ''}` : '';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {/* CARD */}
      <div className='w-[40em] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

        {/* Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Confirmar criação da viagem</h2>
            <button>
              <X onClick={closeConfirmTripModal} className='size-5 text-zinc-400' />
            </button>
          </div>

          <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='font-semibold text-zinc-100' >{destination}</span> nas datas de <span className='font-semibold text-zinc-100'>{displayDate}</span> preencha seus dados abaixo:</p>
        </div>

        {/* Form */}
        <form onSubmit={createTrip} className='space-y-3'>

          <div className='space-y-2'>
            {/* Input Name*/}
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <User className='text-zinc-400 size-5' />
              <input
                onChange={event => setOwnerName(event.target.value)}
                type="text"
                name="name"
                placeholder="Seu nome completo"
                className={enabledInput + ' flex-1'}
              />
            </div>

            {/* Input Email*/}
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <Mail className='text-zinc-400 size-5' />
              <input
                onChange={event => setOwnerEmail(event.target.value)}
                type="email"
                name="email"
                placeholder="Seu e-mail pessoal"
                className={enabledInput + ' flex-1'}
              />
            </div>

          </div>

          <Button type="submit" variant="primary" size="medium" width="full">
            Confirmar criação da viagem
            <Plus className="size-5" />
          </Button>
        </form>

      </div>
    </div>
  )
}