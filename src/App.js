import React, { useState, useEffect } from 'react'
import { questions as data } from './test-data'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Nav } from './components/Nav'
import { Questions } from './components/Questions'
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { AddQuestion } from './components/AddQuestion';



export const App = () => {
    const [questions] = useState(data)
    const [ auth, setAuth ] = useState('')

    useEffect(() => console.log(auth), [auth])

    return (
        <Router>
            <div className="app">
                <Nav token={auth} />
                <Switch>
                    <Route exact path="/" component={() => <Questions questions={questions} />} />
                    <Route path="/login" component={() => <Login setAuth={setAuth} />} />
                    <Route path ="/profile" render={() => auth 
                        ? <Profile />
                        : <Redirect to={{ pathname: '/login' }}/> }
                    />
                    <Route path="/ask-question" component={AddQuestion} />
                </Switch>
            </div>
        </Router>
    )
}