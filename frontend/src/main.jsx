import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SearchContextProvider } from './context/SearchContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchContextProvider>
      <AuthContextProvider>
        
        <App />

      </AuthContextProvider>
    </SearchContextProvider>
  </React.StrictMode>,
)
