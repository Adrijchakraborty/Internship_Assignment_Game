import React from 'react'
import GameBoard from './pages/GameBoard'
import { Route, Routes } from 'react-router-dom'
import ScoreBoard from './pages/ScoreBoard'

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<GameBoard/>}/>
      <Route path='/scores' element={<ScoreBoard/>}/>
    </Routes>
  )
}

export default App