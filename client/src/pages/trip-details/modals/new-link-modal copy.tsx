import { Link2, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../components/button";

interface NewLinkProps {
  closeNewLinkModal: () => void
  addLink: (event: FormEvent<HTMLFormElement>) => void
}


export function NewLinkModal({
  closeNewLinkModal,
  addLink,
 }: NewLinkProps) {

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {/* CARD */}
      <div className='w-[33.75em] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

        {/* Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Cadastrar link</h2>
            <button>
              <X onClick={closeNewLinkModal} className='size-5 text-zinc-400'/>
            </button>
          </div>

          <p className='text-sm text-zinc-400'>
            Todos os convidados podem visualizar os links importantes.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={addLink} className='space-y-3'>

          <div className='space-y-2'>
            {/* Input Title*/}
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <Tag className='text-zinc-400 size-5'/>
              <input 
                type="text" 
                name="link" 
                placeholder="Título do link" 
                className='bg-transparent text-base placeholder-zinc-400 outline-none flex-1'
              />
            </div>

            {/* Input URL*/}
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 '>
              <Link2 className='text-zinc-400 size-5'/>
              <input 
                type="text" 
                name="url" 
                placeholder="URL" 
                className='bg-transparent text-base placeholder-zinc-400 outline-none flex-1'
              />
            </div>


          </div>

          <Button variant="primary" size="medium" width="full">
            Salvar link
          </Button>
        </form>

      </div>
    </div>
  )
}