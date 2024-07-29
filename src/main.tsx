import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { NoteContextProvider } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NoteContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NoteContextProvider>
  </React.StrictMode>
)
