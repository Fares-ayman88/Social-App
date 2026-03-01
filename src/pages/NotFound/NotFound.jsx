import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AppButton from '../../component/Layout/shared/AppButton/AppButton'

export default function NotFound() {
  return (
    <>
    <Helmet>
      <title>NotFound Page</title>
    </Helmet>
    <section className="min-h-[55vh] grid place-items-center py-8">
      <div className="surface-card max-w-xl w-full p-7 text-center">
        <p className="headline-badge mx-auto">404</p>
        <h1 className="page-title mt-3">Page not found</h1>
        <p className="page-subtitle mt-2">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-6">
          <AppButton as={Link} to="/" className="px-6">
            Go Home
          </AppButton>
        </div>
      </div>
    </section>
    </>
  )
}
