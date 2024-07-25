import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestModal } from './invite-guest-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestStep } from './steps/invite-guest-step';

export function CreateTripPage() {

  const navigate = useNavigate()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState([
    'fernandosbcunha@gmail.com',
    'john@acme.com'
  ]);

  function openGuestInput() {
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
    if (!email){
      return;
    }

    // Duplication validation
    if (emailsToInvite.includes(email)){
      window.alert(`O email '${email}' já está adicionado à lista.`);
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
  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate('/trip/123');
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
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
    
        {/* Input Bars */}
        <div className='flex flex-col gap-4'>
          <DestinationAndDateStep
            closeGuestInput={closeGuestInput}
            openGuestInput={openGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            enabledInput={enabledInput}
            disabledInput={disabledInput}
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
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
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
        />
      )}

    </div>
  );
}
