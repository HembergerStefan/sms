import React from 'react'

import {Navigate} from 'react-router'

export interface ProtectedRouteProps {
    isAuthenticated: boolean
    redirectPath: string
    outlet: JSX.Element
}

const ProtectedRoute = ({isAuthenticated, redirectPath, outlet}: ProtectedRouteProps) => {

    return isAuthenticated ? <Navigate to={{pathname: redirectPath}}/> : outlet
}

export default ProtectedRoute