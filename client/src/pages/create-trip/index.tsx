import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestModal } from './invite-guest-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestStep } from './steps/invite-guest-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';
import { isBefore, sub } from 'date-fns';

export function CreateTripPage() {

  const navigate = useNavigate()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const [isConfirmTripLoading, setIsConfirmTripLoading] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [emailsToInvite, setEmailsToInvite] = useState([
    'james@acme.com',
    'jane@doe.com',
    'john@doe.com',
  ]);

  useEffect(() => {

    async function serverWake() {
      await api.get('/server/wake').then(response => response.data)
    }

    serverWake()
  }, [])

  function openGuestInput() {

    if (!destination || !dateRange) {
      window.alert('Please provide the Destination and Date information.')
      return
    }

    if (dateRange.from && isBefore(dateRange.from.toString(), sub(new Date(), { days: 1 }))) {
      window.alert('The trip cannot start before today.')
      return
    }

    setIsGuestInputOpen(true);
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmModalOpen(false);
  }

  // Add Emails to Invite
  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Get typed Email
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    // If nothing is passed in
    if (!email) {
      return;
    }

    // Duplication validation
    if (emailsToInvite.includes(email)) {
      window.alert(`The email '${email}' is already on the list.`);
      return;
    }

    // Update Emails
    setEmailsToInvite([
      ...emailsToInvite,
      email
    ]);

    event.currentTarget.reset();
  }

  // Remove Emails to Invite
  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);

    setEmailsToInvite(newEmailList);
  }

  // Create Trip
  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validade if all information is filled
    if (
      !destination ||
      !dateRange ||
      !ownerName ||
      !ownerEmail ||
      !emailsToInvite
    ) {
      window.alert('All the fields must be filled to create a trip.')
      return
    }

    // Validade if there is at least one email invited
    if (emailsToInvite.length === 0) {
      window.alert('You need to invite at least one email.')
      return
    }

    setIsConfirmTripLoading(true)

    try {
      const response = await api.post('/trips', {
        destination: destination,
        starts_at: dateRange.from,
        ends_at: dateRange.to,
        owner_name: ownerName,
        owner_email: ownerEmail,
        emails_to_invite: emailsToInvite,
      })

      if (response.status !== 200) {
        throw new Error('Connection Error!')
      }

      const { tripId } = response.data
      navigate(`/trips/${tripId}`);

    } catch (error) {
      window.alert(error)
    } finally {
      setIsConfirmTripLoading(false)
    }

  }

  // Class Variables
  const enabledInput = 'bg-transparent text-lg placeholder-zinc-400 outline-none';
  const disabledInput = 'bg-transparent text-lg placeholder-zinc-400 outline-none opacity-50';

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

      {/* Main */}
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        {/* Title */}
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Invite your friends and <span className='text-zinc-200 font-semibold'>plann</span> your next trip!</p>
        </div>

        {/* Input Bars */}
        <div className='flex flex-col gap-4'>
          <DestinationAndDateStep
            closeGuestInput={closeGuestInput}
            openGuestInput={openGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            enabledInput={enabledInput}
            disabledInput={disabledInput}
            setDestination={setDestination}
            setDateRange={setDateRange}
            dateRange={dateRange}
          />


          {/* Guests Input */}
          {isGuestInputOpen && (
            <InviteGuestStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestModal={openGuestModal}
            />
          )}

        </div>

        <p className="text-sm text-zinc-500">
          When planning your trip through plann.er you automatically agree <br />
          with our <a className="text-zinc-300 underline" href="#">terms and conditions</a> and <a className="text-zinc-300 underline" href="#">privacy policy</a>.
        </p>

      </div>

      {/* Modal Invite*/}
      {isGuestModalOpen && (
        <InviteGuestModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvite={removeEmailFromInvite}
          closeGuestModal={closeGuestModal}
          enabledInput={enabledInput}
        />
      )}

      {/* Modal Confirm*/}
      {isConfirmModalOpen && (
        <ConfirmTripModal
          createTrip={createTrip}
          closeConfirmTripModal={closeConfirmTripModal}
          enabledInput={enabledInput}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
          destination={destination}
          dateRange={dateRange}
          isConfirmTripLoading={isConfirmTripLoading}
        />
      )}

    </div>
  );
}
