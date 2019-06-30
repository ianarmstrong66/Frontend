import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import LoginComponent from './LoginComponent'
import ManagementComponent from './ManagementComponent';
// import TodoComponent from './TodoComponent';

class FeatureApp extends Component {
    render() {
        return (
            <>
                <Router>
                    <>
                        <MenuComponent />
                        <div className="container">
                            <Switch>
                                <Route path="/" exact component={LoginComponent} />
                                <Route path="/login" exact component={LoginComponent} />
                                <Route path="/Management" exact component={ManagementComponent} />
                            </Switch>
                        </div>
                    </>
                </Router>
            </>
        )
    }
}

export default FeatureApp;