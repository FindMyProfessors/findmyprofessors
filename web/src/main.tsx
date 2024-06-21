import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
//import './index.css'
import './global.css';
import { DataTableDemo } from './pages/TestPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataTableDemo />
  </React.StrictMode>,
)
