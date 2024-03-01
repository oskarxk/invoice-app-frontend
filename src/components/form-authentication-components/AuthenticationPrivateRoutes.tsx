import { Outlet, Navigate } from 'react-router';

export const AuthenticationPrivateRoutes = () => {
  const isAuthenticated = () => {
    // return sessionStorage.getItem('authToken') !== null;
    return true // only for dev work purpose
  };

  const isLoggedIn = isAuthenticated();

  return isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default AuthenticationPrivateRoutes;