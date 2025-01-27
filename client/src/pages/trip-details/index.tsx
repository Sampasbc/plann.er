import { Plus } from "lucide-react";
import { NewActivityModal } from "./modals/new-activity-modal";
import { FormEvent, useState } from "react";
import { NewLinkModal } from "./modals/new-link-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader, Trip } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { UpdateTripModal } from "./modals/update-trip-modal";
import { DateRange } from "react-day-picker";
import { ConfirmDeletionModal } from "./modals/confirm-deletion-modal";
import { InviteGuestModal } from "./modals/invite-guest-modal";

export function TripDetailsPage() {

  const { tripId } = useParams()

  // Activity States
  const [dateRange, setDateRange] = useState<Trip | undefined>(undefined)
  const [activityId, setActivityId] = useState('')
  const [activityTitle, setActivityTitle] = useState('')
  const [activityDate, setActivityDate] = useState('')
  const [activityTime, setActivityTime] = useState('')

  // Modal States
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isNewLinkModalOpen, setNewLinkModalOpen] = useState(false);
  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false)
  const [isInviteGuestModal, setIsInviteGuestModal] = useState<boolean>(false)
  const [isConfirmDeletionModalOpen, setIsConfirmDeletionModalOpen] = useState(false)

  // Loading States
  const [isAddActivityLoading, setIsAddActivityLoading] = useState(false)
  const [isAddLinkLoading, setIsAddLinkLoading] = useState(false)
  const [isUpdatingTripLoading, setIsUpdatingTripLoading] = useState(false)
  const [isInviteGuestLoading, setIsInviteGuestLoading] = useState(false)

  const [reMount, setReMount] = useState(false)

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

  function openUpdateTripModal() {
    setIsUpdateTripModalOpen(true)
  }

  function closeUpdateTripModal() {
    setIsUpdateTripModalOpen(false)
  }

  function closeConfirmDeletionModal() {
    setIsConfirmDeletionModalOpen(false)
  }

  function openConfirmDeletionModal() {
    setIsConfirmDeletionModalOpen(true)
  }

  function openInviteGuestModal() {
    setIsInviteGuestModal(true)
  }

  function closeInviteGuestModal() {
    setIsInviteGuestModal(false)
  }


  // Add Activity
  async function addActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activityTitle || !activityDate || !activityTime || !tripId) {
      window.alert('Missing information.')
      return
    }

    setIsAddActivityLoading(true)

    const occursAt = `${activityDate} ${activityTime}`

    try {
      const response = await api.post(`/trips/${tripId}/activities/create`, {
        title: activityTitle,
        occurs_at: occursAt
      })

      if (response.status !== 200) {
        throw new Error('Connection Error.')
      }
    } catch (error) {
      window.alert(error)
    } finally {
      setIsAddActivityLoading(false)
      setActivityTime('')
      setActivityDate('')
      setActivityTime('')
      closeActivityModal()
      setReMount(!reMount)
    }
  }

  // Remove Activity
  async function removeActivity(id: string) {

    try {
      const response = await api.delete(`/activities/${id}/delete`)

      if (response.status !== 204) {
        throw new Error('Connection Error.')
      }
    } catch (error) {
      window.alert(error)
    } finally {

      closeConfirmDeletionModal()
      setReMount(!reMount)
    }

  }

  // Add Link
  async function addLink(event: FormEvent<HTMLFormElement>, title: string, url: string, tripId: string | undefined) {
    event.preventDefault();

    if (!title || !url || !tripId) {

      window.alert('The fields "Link Title" and "URL" must be filled to save a link.')
      return
    }

    setIsAddLinkLoading(true)

    try {

      const response = await api.post(`/trips/${tripId}/links/create`, {
        title: title,
        url: url,
      })

      if (response.status !== 200) {
        throw new Error('Connection Error.')
      }
    } catch (error) {
      window.alert(error)
    } finally {
      setReMount(!reMount)
      closeNewLinkModal()
      setIsAddLinkLoading(false)
    }


  }

  // Remove Link
  async function removeLink(linkId: string) {

    try {

      const response = await api.delete(`/links/${linkId}/delete`)

      if (response.status !== 204) {
        throw new Error('Connection Error.')
      }
    } catch (error) {
      window.alert(error)
    } finally {
      setReMount(!reMount)
    }

  }

  // Update Trip
  async function updateTrip(event: FormEvent<HTMLFormElement>, newDestination: string, date: DateRange | undefined, tripId: string | undefined) {

    event.preventDefault()
    setIsUpdatingTripLoading(true)

    if (!newDestination && !date) {
      window.alert('At least one field must be filled.')
      setIsUpdatingTripLoading(false)
      return
    }

    const start = date?.from
    const end = date?.to

    function getDestination() {
      if (!newDestination) return undefined
      return newDestination
    }

    function getStartDate() {
      if (!start) return undefined
      return start
    }

    function getEndDate() {
      if (!end) return undefined
      return end
    }

    try {

      const response = await api.put(`/trips/${tripId}/update`, {
        destination: getDestination(),
        starts_at: getStartDate(),
        ends_at: getEndDate(),
      })

      if (response.status !== 200) {
        throw new Error('Connection Error.')
      }

    } catch (error) {
      window.alert(error)
    } finally {
      setReMount(!reMount)
      closeUpdateTripModal()
      setIsUpdatingTripLoading(false)
    }

  }

  // Invite Guest
  async function inviteGuest(guestEmail: string) {
    if (!guestEmail) {
      window.alert('Please submit an email.')
      return
    }
    setIsInviteGuestLoading(true)
    try {
      const response = await api.post(`/trips/${tripId}/participants/invite`, {
        email: guestEmail
      })
      if (response.status !== 200) {
        throw new Error('Connection Error.')
      }
    } catch (error) {
      window.alert(error)
    } finally {
      setIsInviteGuestLoading(false)
      closeInviteGuestModal()
      setReMount(!reMount)
    }
  }

  // Edit Guest Name
  async function updateGuestName(name: string, guestId: string) {
    try {
      const response = await api.put(`/participants/${guestId}/update`, {
        name: name
      })

      if (response.status !== 200) {
        throw new Error('Connection Error.')
      }
    } catch (error) {
      window.alert(error)
    } finally {
      setReMount(!reMount)
    }
  }

  // Remove Guest
  async function removeGuest(guestId: string) {

    try {
      const response = await api.delete(`/participants/${guestId}/delete`)

      if (response.status !== 204) {
        throw new Error('Connection Error.')
      }

    } catch (error) {
      window.alert(error)
    } finally {
      setReMount(!reMount)
    }
  }

  return (
    <div className="h-screen py-10">

      {/* Container */}
      <div className="max-w-6xl space-y-8 mx-auto">

        {/* Header */}
        <DestinationAndDateHeader
          openUpdateTripModal={openUpdateTripModal}
          setDateRange={setDateRange}
          reMount={reMount}
        />

        {/* Main */}
        <main className="flex gap-16 px-6">

          {/* Activities */}
          <div className="flex-1 space-y-6" >

            {/* Title */}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl text-zinc-50 font-semibold" >Activities</h2>
              <Button variant='primary' onClick={openActivityModal}>
                <Plus className="size-5 text-lime-950" />
                Register activity
              </Button>
            </div>

            <Activities
              reMount={reMount}
              removeActivity={removeActivity}
              openConfirmDeletionModal={openConfirmDeletionModal}
              setActivityId={setActivityId}
            />

          </div>

          {/* Sidebar */}
          <div className="w-80 flex flex-col gap-6">

            <ImportantLinks
              openNewLinkModal={openNewLinkModal}
              removeLink={removeLink}
              reMount={reMount}
            />

            <div className='h-px w-full bg-zinc-800'></div>

            <Guests
              removeGuest={removeGuest}
              updateGuestName={updateGuestName}
              openInviteGuestModal={openInviteGuestModal}
              reMount={reMount}
            />
          </div>

        </main>

      </div>

      {isActivityModalOpen && (
        <NewActivityModal
          dateRange={dateRange}
          closeActivityModal={closeActivityModal}
          addActivity={addActivity}
          setActivityTitle={setActivityTitle}
          setActivityDate={setActivityDate}
          setActivityTime={setActivityTime}
          isAddActivityLoading={isAddActivityLoading}
        />
      )}

      {isNewLinkModalOpen && (
        <NewLinkModal
          closeNewLinkModal={closeNewLinkModal}
          addLink={addLink}
          isAddLinkLoading={isAddLinkLoading}
        />
      )}

      {isUpdateTripModalOpen && (
        <UpdateTripModal
          closeUpdateTripModal={closeUpdateTripModal}
          updateTrip={updateTrip}
          isUpdatingTripLoading={isUpdatingTripLoading}
        />
      )}

      {isInviteGuestModal && (
        <InviteGuestModal
          closeInviteGuestModal={closeInviteGuestModal}
          inviteGuest={inviteGuest}
          isInviteGuestLoading={isInviteGuestLoading}
        />
      )}

      {isConfirmDeletionModalOpen && (
        <div className="opacity-100">
          <ConfirmDeletionModal
            onClick={() => removeActivity(activityId)}
            closeConfirmDeletionModal={closeConfirmDeletionModal}
            context={'activity'}
          />
        </div>
      )}

    </div>
  )
}