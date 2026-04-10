import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Actions from './pages/Actions'
import Quiz from './pages/Quiz'
import SignalerBesoin from './pages/SignalerBesoin'
import Prieres from './pages/Prieres'
import Urgences from './pages/Urgences'
import Paroisse from './pages/Paroisse'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/signaler" element={<SignalerBesoin />} />
        <Route path="/prieres" element={<Prieres />} />
        <Route path="/urgences" element={<Urgences />} />
        <Route path="/paroisse" element={<Paroisse />} />
      </Route>
    </Routes>
  )
}

export default App
