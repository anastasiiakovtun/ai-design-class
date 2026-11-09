import { useRef, useState } from 'react'
import { ActionBar, Input, SummaryRow, TopBar } from './ComponentsOverview'
import './ConfirmScreen.css'

type ConfirmScreenProps = {
  onBack?: () => void
  selectedDay?: string
  selectedTime?: string
}

export function ConfirmScreen({ onBack, selectedDay = 'Today', selectedTime = '16:30' }: ConfirmScreenProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const validPhone = /^\+?[0-9 ()-]{8,}$/.test(phone.trim())
  const nameError = submitted && !name.trim() ? 'Enter your name.' : undefined
  const phoneError = submitted && !validPhone ? 'Enter a valid phone number.' : undefined

  const handleConfirm = () => {
    setSubmitted(true)
    if (!name.trim()) {
      nameRef.current?.focus()
      return
    }
    if (!validPhone) {
      phoneRef.current?.focus()
      return
    }
    setConfirmed(true)
  }

  return (
    <main className="confirm-screen" data-node-id="7:128">
      <TopBar step="Step 3 of 3" onBack={onBack} />
      <section className="confirm-screen__content" aria-labelledby="confirm-title">
        <header className="confirm-screen__header">
          <h1 id="confirm-title">Check and confirm</h1>
        </header>

        <section className="confirm-screen__summary" aria-label="Booking summary">
          <SummaryRow />
          <SummaryRow label="Drop-off" value={`${selectedDay} at ${selectedTime}`} />
          <SummaryRow label="Price" value="€15, pay at pick-up" />
        </section>

        <Input label="Your name" placeholder="First and last name" value={name} onChange={setName} state={nameError ? 'Error' : 'Default'} error={nameError} inputRef={nameRef} />
        <Input label="Phone number" placeholder="+32 470 12 34 56" value={phone} onChange={setPhone} state={phoneError ? 'Error' : 'Focus'} type="tel" error={phoneError} inputRef={phoneRef} />
        <p className="confirm-screen__helper">We text you when your bike is ready. You pay when you pick it up.</p>
        {confirmed && <p className="confirm-screen__success" role="status">Booking confirmed. We’ll text you when your bike is ready.</p>}
      </section>
      <ActionBar label={confirmed ? 'Booking confirmed' : 'Confirm booking'} onBook={confirmed ? undefined : handleConfirm} />
    </main>
  )
}
