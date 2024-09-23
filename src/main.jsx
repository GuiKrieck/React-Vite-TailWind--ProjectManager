import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ProjectsProvider from "./store/project-context.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>
  </React.StrictMode>,
)
