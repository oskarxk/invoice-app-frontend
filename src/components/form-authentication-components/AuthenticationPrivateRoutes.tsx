import { Outlet, Navigate } from 'react-router';

export const AuthenticationPrivateRoutes = () => {
  const isAuthenticated = () => {
    return sessionStorage.getItem('authToken') !== null;
  };

  const isLoggedIn = isAuthenticated();

  return isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default AuthenticationPrivateRoutes;