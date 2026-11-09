import { useState } from 'react'
import { ActionBar, TimeSlot, TopBar } from './ComponentsOverview'
import './PickSlotScreen.css'

type PickSlotScreenProps = {
  onBack?: () => void
  onContinue?: (day: string, time: string) => void
}

export function PickSlotScreen({ onBack, onContinue }: PickSlotScreenProps) {
  const [day, setDay] = useState('Today')
  const [time, setTime] = useState('16:30')

  return (
    <main className="pick-slot-screen" data-node-id="7:121">
      <TopBar step="Step 2 of 3" onBack={onBack} />
      <section className="pick-slot-screen__content" aria-labelledby="pick-slot-title">
        <header className="pick-slot-screen__header">
          <h1 id="pick-slot-title">Pick a drop-off time</h1>
          <p>Flat tyre repair, about 30 minutes</p>
        </header>

        <fieldset className="pick-slot-screen__group">
          <legend>Day</legend>
          <div className="pick-slot-screen__options">
            {['Today', 'Tomorrow', 'Mon 16'].map((option) => (
              <TimeSlot
                key={option}
                label={option}
                state={day === option ? 'Selected' : 'Default'}
                onSelect={() => setDay(option)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="pick-slot-screen__group">
          <legend>Drop-off time</legend>
          <div className="pick-slot-screen__options">
            {['09:00', '10:30', '12:00', '14:00', '16:30', '17:30'].map((option) => {
              const disabled = option === '09:00' || option === '10:30'
              return (
                <TimeSlot
                  key={option}
                  label={option}
                  state={disabled ? 'Disabled' : time === option ? 'Selected' : 'Default'}
                  onSelect={() => setTime(option)}
                />
              )
            })}
          </div>
        </fieldset>

        <p className="pick-slot-screen__helper">Ready the same day. We text you when your bike is done.</p>
      </section>
      <ActionBar label="Continue" onBook={() => onContinue?.(day, time)} />
    </main>
  )
}
