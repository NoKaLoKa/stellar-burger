import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../../features/userSlice';
import React from 'react';

type TProtectedProps = {
  isAuthNeeded?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  isAuthNeeded = false,
  children
}: TProtectedProps) => {
  const user = useSelector(getUser);
  const location = useLocation();

  if (isAuthNeeded && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!isAuthNeeded && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
