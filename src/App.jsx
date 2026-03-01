
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Routing/AppRoutes'
import AuthProvider from './context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Offline } from 'react-detect-offline'
import { Alert } from '@heroui/react'

const queryClient = new QueryClient()

function App() {

  return (
    <>
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          border: "1px solid #cfe3dc",
          borderRadius: "14px",
          background: "#f7fcfa",
          color: "#13362f",
          fontWeight: "600",
          boxShadow: "0 12px 30px rgba(16,42,35,0.12)",
        },
      }}
    />
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      </QueryClientProvider>
    </AuthProvider>
    
   <Offline>
    <Alert
      className='floating-alert fixed top-24 end-4 w-auto'
      color='danger'
      title={"You are currently offline"}
    />
   </Offline>
    </>
  )
}

export default App
