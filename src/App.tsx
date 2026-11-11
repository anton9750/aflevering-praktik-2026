import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Timeline } from './pages/Timeline'
import { MapPage } from './pages/MapPage'
import { EventDetail } from './pages/EventDetail'
import { PersonDetail } from './pages/PersonDetail'
import { CountryDetail } from './pages/CountryDetail'
import { Search } from './pages/Search'
import { Compare } from './pages/Compare'
import { Quiz } from './pages/Quiz'
import { Collections } from './pages/Collections'
import { Favorites } from './pages/Favorites'
import { Login } from './pages/Login'
import { Privacy } from './pages/Privacy'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tidslinje" element={<Timeline />} />
        <Route path="kort" element={<MapPage />} />
        <Route path="begivenhed/:id" element={<EventDetail />} />
        <Route path="person/:id" element={<PersonDetail />} />
        <Route path="land/:id" element={<CountryDetail />} />
        <Route path="soeg" element={<Search />} />
        <Route path="sammenlign" element={<Compare />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="samlinger" element={<Collections />} />
        <Route path="favoritter" element={<Favorites />} />
        <Route path="login" element={<Login />} />
        <Route path="privatliv" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
