import React, { useState } from 'react'
import { questions as data } from './test-data'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Nav } from './components/Nav'
import { Questions } from './components/Questions'
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
                </Switch>
            </div>
        </Router>
    )
}