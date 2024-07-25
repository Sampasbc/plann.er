import { Plus } from "lucide-react";
import { NewActivityModal } from "./modals/new-activity-modal";
import { FormEvent, useState } from "react";
import { NewLinkModal } from "./modals/new-link-modal copy";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

export function TripDetailsPage() {

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isNewLinkModalOpen, setNewLinkModalOpen] = useState(false);

  function closeActivityModal() {
    setIsActivityModalOpen(false);
  }

  function openActivityModal() {
    setIsActivityModalOpen(true);
  }

  function openNewLinkModal() {
    setNewLinkModalOpen(true);
  }

  function closeNewLinkModal() {
    setNewLinkModalOpen(false);
  }

  // Add Activity
  function addActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    return;
  }

  // Add Link
  async function addLink(event: FormEvent<HTMLFormElement>, title: string, url: string, tripId: string | undefined) {
    event.preventDefault();

    if (!title || !url || !tripId) {
      return
    }

    const response = await api.post(`/trips/${tripId}/links/create`, {
      title: title,
      url: url,
    })

    if (response.status !== 200) {
      window.alert('Connection Error.')
      return
    }

    closeNewLinkModal()
  }

  return (
    <div className="h-screen py-10">

      {/* Container */}
      <div className="max-w-6xl space-y-8 mx-auto">

        {/* Header */}
        <DestinationAndDateHeader />

        {/* Main */}
        <main className="flex gap-16 px-6">

          {/* Activities */}
          <div className="flex-1 space-y-6" >

            {/* Title */}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl text-zinc-50 font-semibold" >Atividades</h2>
              <Button variant='primary' onClick={openActivityModal}>
                <Plus className="size-5 text-lime-950" />
                Cadastrar atividade
              </Button>
            </div>

            <Activities />

          </div>

          {/* Sidebar */}
          <div className="w-80 flex flex-col gap-6">

            <ImportantLinks
              openNewLinkModal={openNewLinkModal}
            />

            <div className='h-px w-full bg-zinc-800'></div>

            <Guests />
          </div>

        </main>

      </div>

      {isActivityModalOpen && (
        <NewActivityModal
          closeActivityModal={closeActivityModal}
          addActivity={addActivity}
        />
      )}

      {isNewLinkModalOpen && (
        <NewLinkModal
          closeNewLinkModal={closeNewLinkModal}
          addLink={addLink}
        />
      )}

    </div>
  )
}