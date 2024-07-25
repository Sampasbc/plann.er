import { AtSign, Plus, X } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '../../components/button';

interface InviteGuestModalProps {
  closeGuestModal: () => void
  emailsToInvite: string[]
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromInvite: (email: string) => void
  enabledInput: string
}

export function InviteGuestModal({ 
  addNewEmailToInvite,
  closeGuestModal,
  emailsToInvite,
  removeEmailFromInvite,
  enabledInput
}: InviteGuestModalProps) {

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {/* CARD */}
      <div className='w-[40em] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

        {/* Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
            <button>
              <X onClick={closeGuestModal} className='size-5 text-zinc-400'/>
            </button>
          </div>

          <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
        </div>

        {/* Emails */}
        <div className='flex flex-wrap gap-2'>
          
          {emailsToInvite.map(email => {
            return (
              <div  key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                <span className='text-zinc-300'>{email}</span>
                <button type='button'>
                  <X className='size-4 text-zinc-400' onClick={() => removeEmailFromInvite(email)}/>
                </button>
              </div>
            )
          })}

        </div>

        <div className='w-full h-px bg-zinc-800'></div>

        {/* Form */}
        <form onSubmit={addNewEmailToInvite} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
          <div className='px-2 flex items-center flex-1 gap-2'>
            <AtSign className='text-zinc-400 size-5'/>
            <input 
              type="email" 
              name="email" 
              placeholder="Digite o e-mail do convidado" 
              className={enabledInput + ' flex-1'}
            />
          </div>

          <Button type='submit' variant='primary' size='small' >
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>

      </div>
    </div>
  )
}