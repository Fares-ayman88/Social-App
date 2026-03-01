
import { Navigate } from 'react-router-dom';
// This component is a higher-order component that checks if the user is authenticated by looking for a token in localStorage. If a token is found, it redirects the user to the home page ("/"). If no token is found, it renders the child components (the authentication routes like login and register).
export default function ProtectedAuthRoutes({children}) {
  const token = localStorage.getItem("token");
  // If a token exists, it means the user is already authenticated, so we redirect them to the home page. Otherwise, we render the child components which are the authentication routes.
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
}
