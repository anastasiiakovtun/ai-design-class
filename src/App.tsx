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
        <ChooseServiceScreen onContinue={() => navigate('slot')} />
      ) : view === 'slot' ? (
        <PickSlotScreen
          onBack={() => navigate('service')}
          onContinue={(day, time) => { setSelectedDay(day); setSelectedTime(time); navigate('confirm') }}
        />
      ) : (
        <ConfirmScreen selectedDay={selectedDay} selectedTime={selectedTime} onBack={() => navigate('slot')} />
      )}
    </div>
  )
}

export default App
