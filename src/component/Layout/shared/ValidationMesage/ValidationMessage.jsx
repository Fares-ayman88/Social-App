import React from 'react'

export default function ValidationMessage({field, isTouched}) {
  return (
    <>
    
    {field && isTouched && (
              <p className="text-red-500 text-sm">{field.message}</p>
            )}
    
    </>
  )
}

