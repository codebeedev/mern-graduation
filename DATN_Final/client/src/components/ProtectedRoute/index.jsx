import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, redirectPath = '/login', children }) => {
	const { loading, user, isAuthenticated } = useSelector(state => state.user);

	if (loading === false) {
		if (!isAuthenticated) {
			return <Navigate to={redirectPath} replace />;
		}

		if (isAdmin && user.role !== 'admin') {
			return <Navigate to={redirectPath} replace />;
		}

		return children ? children : <Outlet />;
	}
};

export default ProtectedRoute;
