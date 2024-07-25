import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

interface ImportantLinksProps {
  openNewLinkModal: () => void
}

export function ImportantLinks({ 
  openNewLinkModal,
 }: ImportantLinksProps) {
  return (
    <div className="flex flex-col gap-6" >

      <span className="text-zinc-50 text-xl font-semibold" >
        Links importantes
      </span>

      {/* List */}
      <div className="space-y-5">

        {/* single link */}
        <div className="flex items-center justify-between" >
          <div className="flex flex-1 flex-col gap-[6px] max-w-60">
            <span className="text-base text-zinc-100" >Reseva do AirBnB</span>
            <a 
            href="https://www.airbnb.com.br/rooms/10470012938129123841902839"
            className="text-xs text-zinc-400 truncate hover:text-zinc-300" >
              https://www.airbnb.com.br/rooms/10470012938129123841902839
              </a>
          </div>
          <button>
            <Link2 className="text-zinc-400 size-5" />
          </button>
        </div>

        {/* single link */}
        <div className="flex items-center justify-between" >
          <div className="flex flex-1 flex-col gap-[6px] max-w-60">
            <span className="text-base text-zinc-100" >Regras da casa</span>
            <a 
            href="https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000"
            className="text-xs text-zinc-400 truncate hover:text-zinc-300" >
            https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
            </a>
          </div>
          <button>
            <Link2 className="text-zinc-400 size-5" />
          </button>
        </div>

      </div>

      <Button onClick={openNewLinkModal} variant='secondary' size="medium">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

    </div>
  )
}