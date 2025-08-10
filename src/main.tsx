import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { ChatProvider } from '@/context/ChatContext.tsx'
import { CompletionProvider } from '@/context/CompletionContext.tsx'
import { SolutionProvider } from '@/context/SolutionContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <SolutionProvider>
        <CompletionProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </CompletionProvider>
      </SolutionProvider>
    </StrictMode>
  </BrowserRouter>
  ,
)
