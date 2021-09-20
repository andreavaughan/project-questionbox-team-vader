import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import axios from 'axios'
import { Nav } from './components/Nav'
import { Questions } from './components/Questions'
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { AddQuestion } from './components/AddQuestion'
import { Register } from './components/Register'
import { QuestionDetail } from './components/QuestionDetail';



export const App = () => {
    const [ auth, setAuth, {removeItem} ] = useLocalStorageState('token', '')
    const [isLoading, setIsLoading] = useState(true)
    const [ questionID, setQuestionID ] = useLocalStorageState('questionID', '')
    const [ userId, setUserId ] = useState()
    const [ user, setUser ] = useState({})

    useEffect(() => {
        let isMounted = true

        if (auth) {
            axios.get('https://questionbox1.herokuapp.com/auth/users/me/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${auth}`
                }
            }).then((response) => {
                if (isMounted) {
                    setUser(response.data)
                    setUserId(response.data.id)
                }
            })
        }

        return () => {
            isMounted = false
        }

        
    }, [auth])

    console.log(auth)
    console.log(user)
    console.log(userId)

    return (
        <Router>
            <div className="app">
                <Nav token={auth} clearStorage={removeItem} />
                <Switch>
                    <Route exact path="/" component={() => <Questions isLoading={isLoading} setIsLoading={setIsLoading} token={auth} setQuestionID={setQuestionID}/>} />
                    <Route path="/login" component={() => <Login setAuth={setAuth} />} />
                    <Route path ="/profile" render={() => auth 
                        ? <Profile token={auth} user={user} />
                        : <Redirect to={{ pathname: '/login' }}/> }
                    />
                    <Route path="/ask-question" component={AddQuestion} />
                    <Route path="/register" component={() => <Register setAuth={setAuth} />} />
                    <Route path="/question-detail" component={() => <QuestionDetail token={auth} questionID={questionID} isLoading={isLoading} setIsLoading={setIsLoading} userId={userId}/>} />
                </Switch>
            </div>
        </Router>
    )
}