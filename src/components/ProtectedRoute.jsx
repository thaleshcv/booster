import React from 'react';
import { Route } from 'react-router-dom';

function ProtectedRoute({ authorized, redirect, children, ...rest }) {
	return <Route {...rest}>{!authorized ? redirect : children}</Route>;
}

export default ProtectedRoute;
