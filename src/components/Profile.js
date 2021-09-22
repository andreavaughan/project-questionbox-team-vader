import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Question } from './Question'
import { Answer } from './Answer'

export const Profile = ({ token, user, isLoading, setIsLoading, setQuestionID }) => {
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
                    setProfile(response.data)
                    setIsLoading(false)
                }
            })

        return () => {
            isMounted = false
        }
        
    }, [token])
    

    // console.log(profile[0].username)
    // console.log(profile[0].questions)

    return isLoading ?
        <>
            <strong>Loading...</strong>
            <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </> :
        <>       
            { profile && (
                <>
                <div className="header">
                    <h1>Profile</h1>
                    <h3>{profile[0].username}'s contributions</h3>
                    <div className="header-links">
                        <p>My Questions | My Answers | Bookmarked</p>
                    </div>
                </div>
                <div>
                    <div className="">
                        { profile[0].questions && profile[0].questions.map((question, idx) => {
                            return (
                                <Question key={idx} question={question} setQuestionID={setQuestionID} />
                            )
                        })}
                    </div>
                    <div className="a-body">
                            { profile[0].answer && 
                                (profile[0].answer.map((answer, idx) => {
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

