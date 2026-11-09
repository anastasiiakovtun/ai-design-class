import { useState } from 'react'
import chevronLeft from '../assets/chevron-left.svg'
import './ComponentsOverview.css'

type TagProps = {
  label?: string
}

export function Tag({ label = '30 min' }: TagProps) {
  return (
    <span className="ds-tag" data-node-id="3:27">
      {label}
    </span>
  )
}

type ButtonProps = {
  label?: string
  variant?: 'Primary' | 'Secondary'
  onClick?: () => void
}

export function Button({
  label = 'Book this repair',
  variant = 'Primary',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`ds-button ds-button--${variant.toLowerCase()}`}
      data-node-id={variant === 'Primary' ? '3:29' : '3:31'}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  )
}

type TimeSlotProps = {
  label?: string
  state?: 'Default' | 'Selected' | 'Disabled'
  onSelect?: () => void
}

export function TimeSlot({ label = '16:30', state = 'Default', onSelect }: TimeSlotProps) {
  return (
    <button
      className={`ds-time-slot ds-time-slot--${state.toLowerCase()}`}
      data-node-id={state === 'Default' ? '6:8' : state === 'Selected' ? '6:10' : '6:12'}
      disabled={state === 'Disabled'}
      type="button"
      onClick={onSelect}
    >
      {label}
    </button>
  )
}

type InputProps = {
  label?: string
  placeholder?: string
  state?: 'Default' | 'Focus'
  value?: string
  onChange?: (value: string) => void
}

export function Input({
  label = 'Your name',
  placeholder = 'First and last name',
  state = 'Default',
  value = '',
  onChange,
}: InputProps) {
  return (
    <label className="ds-input" data-node-id={state === 'Focus' ? '6:19' : '6:15'}>
      <span className="ds-input__label">{label}</span>
      <input
        className={`ds-input__field ds-input__field--${state.toLowerCase()}`}
        data-node-id={state === 'Focus' ? '6:21' : '6:17'}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        aria-label={label}
      />
    </label>
  )
}

type TopBarProps = {
  step?: string
  title?: string
  onBack?: () => void
}

export function TopBar({ step = 'Step 1 of 3', title = 'Book a repair', onBack }: TopBarProps) {
  return (
    <header className="ds-top-bar" data-node-id="6:24">
      <button className="ds-top-bar__back" type="button" aria-label="Go back" onClick={onBack}>
        <img src={chevronLeft} alt="" aria-hidden="true" />
      </button>
      <h1>{title}</h1>
      <span className="ds-top-bar__step">{step}</span>
    </header>
  )
}

type ServiceCardProps = {
  description?: string
  price?: string
  state?: 'Default' | 'Selected'
  title?: string
}

export function ServiceCard({
  description = 'Tube or tyre swap, any wheel size.',
  price = '€15',
  state = 'Default',
  title = 'Flat tyre repair',
}: ServiceCardProps) {
  return (
    <article className={`ds-service-card ds-service-card--${state.toLowerCase()}`} data-node-id={state === 'Selected' ? '11:25' : '11:17'}>
      <div className="ds-service-card__header">
        <h2>{title}</h2>
        <strong>{price}</strong>
      </div>
      <p>{description}</p>
      <div className="ds-service-card__tags">
        <Tag />
      </div>
    </article>
  )
}

type SummaryRowProps = {
  label?: string
  value?: string
}

export function SummaryRow({ label = 'Service', value = 'Flat tyre repair' }: SummaryRowProps) {
  return (
    <div className="ds-summary-row" data-node-id="11:34">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export function ActionBar({ onBook }: { onBook?: () => void }) {
  return (
    <div className="ds-action-bar" data-node-id="11:37">
      <Button label="Book this repair" onClick={onBook} />
    </div>
  )
}

export function ComponentsOverview() {
  const [selectedService, setSelectedService] = useState<'Default' | 'Selected'>('Selected')
  const [selectedTime, setSelectedTime] = useState('16:30')
  const [name, setName] = useState('')
  const [lastAction, setLastAction] = useState('')

  const recordAction = (action: string) => setLastAction(action)

  return (
    <main className="components-overview">
      <section className="components-overview__group components-overview__group--buttons">
        <h2>Button</h2>
        <div className="components-overview__row">
          <Button onClick={() => recordAction('Primary button activated')} />
          <Button variant="Secondary" onClick={() => recordAction('Secondary button activated')} />
        </div>
      </section>

      <section className="components-overview__group components-overview__group--time-slots">
        <h2>Time slot</h2>
        <div className="components-overview__row">
          <TimeSlot state={selectedTime === '16:30' ? 'Selected' : 'Default'} onSelect={() => setSelectedTime('16:30')} />
          <TimeSlot label="17:00" state={selectedTime === '17:00' ? 'Selected' : 'Default'} onSelect={() => setSelectedTime('17:00')} />
          <TimeSlot state="Disabled" />
        </div>
      </section>

      <section className="components-overview__group components-overview__group--inputs">
        <h2>Input</h2>
        <div className="components-overview__row">
          <Input value={name} onChange={setName} />
          <Input state="Focus" value={name} onChange={setName} />
        </div>
      </section>

      <section className="components-overview__group components-overview__group--top-bar">
        <h2>Top bar</h2>
        <TopBar onBack={() => recordAction('Back button activated')} />
      </section>

      <section className="components-overview__group components-overview__group--service-card">
        <h2>Service card</h2>
        <div className="components-overview__row">
          <button className="components-overview__service-trigger" type="button" onClick={() => setSelectedService('Default')}>
            <ServiceCard state={selectedService === 'Default' ? 'Selected' : 'Default'} />
          </button>
          <button className="components-overview__service-trigger" type="button" onClick={() => setSelectedService('Selected')}>
            <ServiceCard state={selectedService === 'Selected' ? 'Selected' : 'Default'} />
          </button>
        </div>
      </section>

      <section className="components-overview__group components-overview__group--summary">
        <h2>Summary row</h2>
        <SummaryRow />
      </section>

      <section className="components-overview__group components-overview__group--action-bar">
        <h2>Action bar</h2>
        <ActionBar onBook={() => recordAction('Booking action activated')} />
      </section>
      <p className="sr-only" aria-live="polite">{lastAction}</p>
    </main>
  )
}
