import { Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { api } from "../../lib/axios";
import { Link } from "../../components/link";

interface ImportantLinksProps {
  openNewLinkModal: () => void
}

interface LinkType {
  id: string
  title: string
  url: string
}

export function ImportantLinks({
  openNewLinkModal,
}: ImportantLinksProps) {

  const { tripId } = useParams()
  const [links, setLinks] = useState<Array<LinkType>>()

  useEffect(() => {
    api.get(`trips/${tripId}/links/get`).then(response => setLinks(response.data.links))
  }, [tripId])

  useEffect(() => {
    console.log(links)
  }, [links])

  return (
    <div className="flex flex-col gap-6" >

      <span className="text-zinc-50 text-xl font-semibold" >
        Links importantes
      </span>

      {/* List */}
      <div className="space-y-5">

        {links && links.length > 0 ? (
          links.map(link => {
            return (
              <Link
                key={link.id}
                title={link.title}
                url={link.url}
              />
            )
          })
        ) : (
          <p className="text-sm text-zinc-500">No links registered yet.</p>
        )}


      </div>

      <Button onClick={openNewLinkModal} variant='secondary' size="medium">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

    </div>
  )
}