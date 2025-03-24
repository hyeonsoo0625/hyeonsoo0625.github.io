import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageRouter from '@/apps/PageRouter';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageRouter />
  </StrictMode>,
)
