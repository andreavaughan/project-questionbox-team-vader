import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Question } from './Question'
import { Answer } from './Answer'
import '../styles/profile.css'

export const Profile = ({ token, isLoading, setIsLoading, setQuestionID }) => {
    const [ profile, setProfile ] = useState([])
    
    useEffect(() => {
        let isMounted = true
        isLoading = true

        axios
            .get('https://questionbox1.herokuapp.com/auth/users/me', {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then((response) => {
                if (isMounted) {
                    setProfile(response.data[0])
                    setIsLoading(false)
                }
            })

        return () => {
            isMounted = false
        }
        
    }, [token])
    
    return isLoading ?
        <>
            <strong>Loading...</strong>
            <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </> :
        <>       
            { profile && (
                <>
                <div className="header">
                    <h2>{profile.username}'s contributions</h2>
                    <div className="header-links">
                        <h5><a href="#my-questions">My Questions</a> | <a href="#my-answers">My Answers</a> </h5>
                    </div>
                </div>
                <div>
                    <div className="q-body" id="my-questions">
                        <h4>Questions</h4>
                        { profile.questions && profile.questions.map((question, idx) => {
                            return (
                                <Question token={token} key={idx} question={question} setQuestionID={setQuestionID} />
                            )
                        })}
                    </div>
                    <div className="a-body" id="my-answers">
                            <h4>Answers</h4>
                            { profile.answer && 
                                (profile.answer.map((answer, idx) => {
                                    return (
                                        <Answer key={idx} answer={answer}/>
                                    )
                                }))
                                }
                        </div>
                </div>
            </>
            )}
        </>
}

