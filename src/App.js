import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { Nav } from './components/Nav'
import { Questions } from './components/Questions'
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { AddQuestion } from './components/AddQuestion'
import { Register } from './components/Register'



export const App = () => {
    const [ auth, setAuth, {removeItem} ] = useLocalStorageState('token', '')
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => console.log(auth), [auth])

    return (
        <Router>
            <div className="app">
                <Nav token={auth} clearStorage={removeItem} />
                <Switch>
                    <Route exact path="/" component={() => <Questions isLoading={isLoading} setIsLoading={setIsLoading} token={auth} />} />
                    <Route path="/login" component={() => <Login setAuth={setAuth} />} />
                    <Route path ="/profile" render={() => auth 
                        ? <Profile token={auth} />
                        : <Redirect to={{ pathname: '/login' }}/> }
                    />
                    <Route path="/ask-question" component={AddQuestion} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </Router>
    )
}