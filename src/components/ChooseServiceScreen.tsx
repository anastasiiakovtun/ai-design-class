import { useState } from 'react'
import { ActionBar, ServiceCard, TopBar } from './ComponentsOverview'
import './ChooseServiceScreen.css'

const services = [
  { title: 'Flat tyre repair', description: 'Tube or tyre swap, any wheel size.', price: '€15', duration: '30 min' },
  { title: 'Brake check and adjust', description: 'Pads, cables and alignment.', price: '€25', duration: '45 min' },
  { title: 'Gear tune-up', description: 'Smooth shifting on every gear.', price: '€30', duration: '45 min' },
  { title: 'Full service', description: 'Everything checked, cleaned and adjusted.', price: '€89', duration: '2 hours' },
]

export function ChooseServiceScreen() {
  const [selectedService, setSelectedService] = useState(services[0].title)
  const [message, setMessage] = useState('')

  return (
    <main className="choose-service-screen" data-node-id="7:114">
      <TopBar onBack={() => setMessage('Back navigation activated')} />
      <section className="choose-service-screen__content" aria-labelledby="choose-service-title">
        <header className="choose-service-screen__header">
          <h1 id="choose-service-title">Choose a service</h1>
          <p>What does your bike need?</p>
        </header>
        <ul className="choose-service-screen__list" aria-label="Available bike services">
          {services.map((service) => (
            <li key={service.title}>
              <button
                className="choose-service-screen__service"
                type="button"
                onClick={() => setSelectedService(service.title)}
                aria-pressed={selectedService === service.title}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  duration={service.duration}
                  price={service.price}
                  state={selectedService === service.title ? 'Selected' : 'Default'}
                />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <ActionBar label="Continue" onBook={() => setMessage(`Continue with ${selectedService}`)} />
      <p className="sr-only" aria-live="polite">{message}</p>
    </main>
  )
}
