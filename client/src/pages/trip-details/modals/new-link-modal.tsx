import { Link2, LoaderCircle, Tag, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";

interface NewLinkProps {
  isAddLinkLoading: boolean
  closeNewLinkModal: () => void
  addLink: (event: FormEvent<HTMLFormElement>, title: string, url: string, tripId: string | undefined) => void
}

export function NewLinkModal({
  isAddLinkLoading,
  closeNewLinkModal,
  addLink,
}: NewLinkProps) {

  const { tripId } = useParams()
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')




  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {/* CARD */}
      <div className='w-[33.75em] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5'>

        {/* Title */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Register link</h2>
            <button>
              <X onClick={closeNewLinkModal} className='size-5 text-zinc-400' />
            </button>
          </div>

          <p className='text-sm text-zinc-400'>
            All guests can view the important links.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={event => addLink(event, linkTitle, linkUrl, tripId)} className='space-y-3'>

          <div className='space-y-2'>
            {/* Input Title*/}
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <Tag className='text-zinc-400 size-5' />
              <input
                type="text"
                name="link"
                placeholder="Link Title"
                className='bg-transparent text-base placeholder-zinc-400 outline-none flex-1'
                onChange={event => setLinkTitle(event.target.value)}
              />
            </div>

            {/* Input URL*/}
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 '>
              <Link2 className='text-zinc-400 size-5' />
              <input
                type="text"
                name="url"
                placeholder="URL"
                className='bg-transparent text-base placeholder-zinc-400 outline-none flex-1'
                onChange={event => setLinkUrl(event.target.value)}
              />
            </div>


          </div>

          <Button disabled={isAddLinkLoading} variant="primary" size="medium" width="full">
            Save link
            {isAddLinkLoading && (
              <LoaderCircle className="size-5 loading" />
            )}
          </Button>
        </form>

      </div>
    </div>
  )
}