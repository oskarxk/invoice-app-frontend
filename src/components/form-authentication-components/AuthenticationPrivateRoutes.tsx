import { Outlet, Navigate } from 'react-router';

export const AuthenticationPrivateRoutes = () => {

  const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null;
  };

  const isLoggedIn = isAuthenticated();

  return isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default AuthenticationPrivateRoutes;