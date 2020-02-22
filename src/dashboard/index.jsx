import React, { Component } from 'react'
import { Layout } from 'antd'
import LeftNav from './leftNav/index.jsx'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import NoMatch from '../pages/noMatch/index.jsx'
import { routes, RouteWithSubRoutes } from '../route/index.jsx'

const { Sider, Content } = Layout

class Dashboard extends Component{
    render() {
        return (
            <HashRouter>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider>
                        <LeftNav />
                    </Sider>
                    <Content style={{ padding: '30px' }}>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to='/add' replace />} />
                            {routes.map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route} />
                            ))}
                            <Route component={NoMatch} />
                        </Switch>
                    </Content>
                </Layout>
            </HashRouter>
        )
    }
}
export default Dashboard