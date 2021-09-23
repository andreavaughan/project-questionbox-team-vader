import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Answer } from './Answer'
import '../styles/question-detail.css'

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
                    console.log(response.data.answers)
                    setQuestionDetail(response.data)
                    setIsLoading(false)
                }
            })

        return () => {
            isMounted = false
        }

    }, [setIsLoading])
    

    const handleDelete = (event) => {
        
        return axios.delete(`https://questionbox1.herokuapp.com/api/questions/${questionID}/`, {
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
                                    <h3>{questionDetail.question}</h3>
                                </blockquote>
                                <p>{questionDetail.details}</p>
                            </div>
                            <div className="card-footer text-muted q-detail">
                                <p>Added: {questionDetail.created_date}</p>
                                <p>Submitted by: {questionDetail.author}</p>
                                { username === questionDetail.author ? 
                                    <button className="btn btn-dark" id={questionDetail.pk} 
                                    onClick={(event) => handleDelete(event)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button> :
                                    <span data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
                                        <button type="button" className="btn btn-dark" id={questionDetail.pk} disabled>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </button>
                                    </span>
                                }                                             
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="a-body">
                            { questionDetail.answers && 
                                (questionDetail.answers.map((answer, idx) => {
                                    return (
                                        <Answer key={idx} answer={answer}/>
                                    )
                                }))
                                }
                        </div>
                    </div>
                    <div className="card answer-button">
                        <div className="card-body">
                            <div className="d-grid gap-2 col-6">
                                <Link to="/add-answer">
                                    <button className="btn btn-secondary btn-lg">+ Add Answer</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

