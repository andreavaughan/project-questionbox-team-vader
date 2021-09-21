import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Answer } from './Answer'

export const QuestionDetail = ({ token, questionID, isLoading, setIsLoading, username }) => {
    const [ questionDetail, setQuestionDetail ] = useState([])
    const history = useHistory()

    useEffect(() => {
        let isMounted = true
        isLoading = true

        axios
            .get(`https://questionbox1.herokuapp.com/api/questions/${questionID}/`, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then((response) => {
                if (isMounted) {
                    setQuestionDetail(response.data)
                    setIsLoading(false)
                }
            })

        return () => {
            isMounted = false
        }

    }, [setIsLoading])
    
    console.log(typeof(questionDetail.answers))
    console.log(username)
    console.log(questionDetail.author)

    const handleDelete = (event) => {
        
        return axios.delete(`https://questionbox1.herokuapp.com/api/questions/${event.target.id}/`, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        .then((response) => {
            if (response.status === 204) {
                history.push('/')
            }
        })
    }

    return isLoading ?
        <>
            <strong>Loading...</strong>
            <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </> :
        (
        <>
            { questionDetail && (
                <>
                    <div className="q-body">
                        <div className="card">
                            <div className="card-body">
                                <blockquote className="blockquote">
                                    <p>{questionDetail.question}</p>
                                </blockquote>
                                <p>{questionDetail.details}</p>
                            </div>
                            <div className="card-footer text-muted q-detail">
                                <p>Added: {questionDetail.created_date}</p>
                                <p>Submitted by: {questionDetail.author}</p>
                                { username === questionDetail.author ? 
                                    <button className="btn btn-dark" id={questionDetail.pk} 
                                    onClick={(event) => handleDelete(event)}> Delete
                                    </button> :
                                    <button className="btn btn-dark" id={questionDetail.pk} 
                                    disabled> Delete
                                    </button>
                                }                                             
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Answers</h2>
                        <Answer token={token}/>
                    </div>
                    <div>
                        <button className="btn btn-secondary">+ Add Answer</button>
                    </div>
                </>
            )}
        </>
    )
}

