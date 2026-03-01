import { Alert } from '@heroui/react'
import React from 'react'

export default function ErrorMessage({error}) {
  return (
    <div className="flex justify-center items-center min-h-[55vh] w-full mx-auto">
       <div className="surface-card max-w-xl w-full p-5">
        <p className="pill-indicator mb-3">Something went wrong</p>
        <Alert color={"danger"} title={error} />
       </div>
    </div>
  )
}
