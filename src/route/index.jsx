
import React from 'react'
import Add from '../pages/add/index.jsx'
import List from '../pages/list/index.jsx'
import Detail from '../pages/detail/index.jsx'
import Nwjs from '../pages/nwjs/index.jsx'
import { Route } from "react-router-dom"
 
const routes = [
    {
        path: "/add",
        component: Add
    },
    {
        path: "/list",
        component: List
    },
    {
        path: "/detail/:id",
        component: Detail
    },
    {
        path: "/nwjs",
        component: Nwjs
    }
]

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
            <route.component {...props} routes={route.routes} />
            )}
        />
    )
}
  
export { routes, RouteWithSubRoutes }
