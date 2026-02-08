import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext' // <--- Import this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap App with the Provider */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)