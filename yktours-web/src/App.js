import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import downImg from './down.png'
import headImg from './head.png'
import Ticket from './pages/ticket'
import Email from './pages/email'
function App() {
  return (
    <div className="App">
      <img src={headImg} className="img-1" alt="head-img" />
      <header className="App-header">
        <h1>Yktours</h1>
        <p className="App-p">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Ticket />} />
              <Route path="/email/:id" element={<Email />} />
            </Routes>
          </BrowserRouter>
        </p>
      </header>
      <img src={downImg} className="img-2" alt="bottom-img" />
    </div>
  )
}

export default App
