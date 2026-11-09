import { useEffect, useState } from 'react'
import { ConfirmScreen } from './components/ConfirmScreen'
import { ChooseServiceScreen } from './components/ChooseServiceScreen'
import { ComponentsOverview } from './components/ComponentsOverview'
import { PickSlotScreen } from './components/PickSlotScreen'
import './App.css'

function App() {
  const getView = (): 'service' | 'slot' | 'confirm' | 'components' => {
    if (window.location.hash === '#components') return 'components'
    if (window.location.hash === '#slot') return 'slot'
    if (window.location.hash === '#confirm') return 'confirm'
    return 'service'
  }

  const [view, setView] = useState(getView)
  const [selectedService, setSelectedService] = useState({ title: 'Flat tyre repair', duration: '30 min', price: '€15' })
  const [selectedDay, setSelectedDay] = useState('Today')
  const [selectedTime, setSelectedTime] = useState('16:30')

  useEffect(() => {
    const onHashChange = () => setView(getView())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (nextView: 'service' | 'slot' | 'confirm' | 'components') => {
    window.location.hash = nextView === 'components' ? 'components' : nextView === 'service' ? 'screen' : nextView
    setView(nextView)
  }

  return (
    <div className="app-shell">
      <nav className="app-nav" aria-label="Spoke workspace">
        <span className="app-nav__brand">Spoke</span>
        <div className="app-nav__links">
          <button className={view !== 'components' ? 'is-active' : ''} type="button" onClick={() => navigate('service')}>Booking flow</button>
          <button className={view === 'components' ? 'is-active' : ''} type="button" onClick={() => navigate('components')}>Components</button>
        </div>
      </nav>
      {view === 'components' ? <ComponentsOverview /> : view === 'service' ? (
        <ChooseServiceScreen onContinue={(service) => {
          const serviceDetails = {
            'Flat tyre repair': { title: 'Flat tyre repair', duration: '30 min', price: '€15' },
            'Brake check and adjust': { title: 'Brake check and adjust', duration: '45 min', price: '€25' },
            'Gear tune-up': { title: 'Gear tune-up', duration: '45 min', price: '€30' },
            'Full service': { title: 'Full service', duration: '2 hours', price: '€89' },
          }[service as 'Flat tyre repair' | 'Brake check and adjust' | 'Gear tune-up' | 'Full service']
          if (serviceDetails) setSelectedService(serviceDetails)
          navigate('slot')
        }} />
      ) : view === 'slot' ? (
        <PickSlotScreen
          onBack={() => navigate('service')}
          serviceTitle={selectedService.title}
          serviceDuration={selectedService.duration}
          onContinue={(day, time) => { setSelectedDay(day); setSelectedTime(time); navigate('confirm') }}
        />
      ) : (
        <ConfirmScreen
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          serviceTitle={selectedService.title}
          servicePrice={selectedService.price}
          onBack={() => navigate('slot')}
          onHome={() => navigate('service')}
        />
      )}
    </div>
  )
}

export default App
