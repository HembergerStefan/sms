import React from 'react'

import {Navigate} from 'react-router'

export interface PrivateRouteProps {
    isAuthenticated: boolean
    authenticationPath: string
    outlet: JSX.Element
}

const PrivateRoute = ({isAuthenticated, authenticationPath, outlet}: PrivateRouteProps) => {

    return isAuthenticated ? outlet : <Navigate to={{pathname: authenticationPath}}/>
}

export default PrivateRoute