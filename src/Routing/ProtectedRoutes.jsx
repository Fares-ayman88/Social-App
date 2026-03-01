import React from 'react'
import { Navigate } from 'react-router-dom';
// This component is a higher-order component that checks if the user is authenticated by looking for a token in localStorage. If a token is found, it renders the child components (the protected routes). If no token is found, it redirects the user to the login page.
export default function ProtectedRoutes({children}) {
  // Check localStorage for a token to determine if the user is authenticated.
  const token = localStorage.getItem("token");
  // If a token exists, render the child components (the protected routes). Otherwise, redirect to the login page.
  if (token) {
    return children;
  }
  return <Navigate to="/auth/login" />;
}
