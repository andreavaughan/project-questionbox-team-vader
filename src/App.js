import React, { useState } from 'react'
import { questions as data } from './test-data'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav } from './components/Nav'
import { Questions } from './components/Questions'
import { Login } from './components/Login'
import { Profile } from './components/Profile'


export const App = () => {
    const [questions] = useState(data)

    return (
        <Router>
            <div className="app">
                <Nav />
                <Switch>
                    <Route exact path="/" component={() => <Questions questions={questions} />} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/login" component={Login} />
                </Switch>
            </div>
        </Router>
    )
}