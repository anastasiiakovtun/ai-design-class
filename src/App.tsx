import { useEffect, useState } from 'react'
import { ChooseServiceScreen } from './components/ChooseServiceScreen'
import { ComponentsOverview } from './components/ComponentsOverview'
import './App.css'

function App() {
  const [view, setView] = useState<'screen' | 'components'>(() =>
    window.location.hash === '#components' ? 'components' : 'screen',
  )

  useEffect(() => {
    const onHashChange = () => setView(window.location.hash === '#components' ? 'components' : 'screen')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (nextView: 'screen' | 'components') => {
    window.location.hash = nextView === 'components' ? 'components' : 'screen'
    setView(nextView)
  }

  return (
    <div className="app-shell">
      <nav className="app-nav" aria-label="Spoke workspace">
        <span className="app-nav__brand">Spoke</span>
        <div className="app-nav__links">
          <button className={view === 'screen' ? 'is-active' : ''} type="button" onClick={() => navigate('screen')}>Booking flow</button>
          <button className={view === 'components' ? 'is-active' : ''} type="button" onClick={() => navigate('components')}>Components</button>
        </div>
      </nav>
      {view === 'components' ? <ComponentsOverview /> : <ChooseServiceScreen />}
    </div>
  )
}

export default App
