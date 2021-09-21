import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Answer } from './Answer'

export const QuestionDetail = ({ token, questionID, isLoading, setIsLoading, username }) => {
    const [ questionDetail, setQuestionDetail ] = useState([])
    const [ answers, setAnswers ] = useState({})
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
                    setAnswers(response.data.answers)
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

    console.log(questionDetail.answers && questionDetail.answers.map((a) => console.log(a.pk)))

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
                        <div className="a-body">
                            { questionDetail.answers && 
                                (questionDetail.answers.map((answer) => {
                                    return <div className="card" key={answer.pk}>
                                        <div className="card-body">
                                            <blockquote className="blockquote">
                                                <p>{answer.answer}</p>
                                            </blockquote>
                                        </div>
                                        <div className="card-footer text-muted q-detail">
                                            <p>Added: {answer.created_date}</p>
                                            <p>Submitted by: {answer.author}</p>
                                        </div>
                                    </div>
                                }))
                                }
                        </div>
                    </div>
                    <div>
                        <Link to="/add-answer">
                            <button className="btn btn-secondary">+ Add Answer</button>
                        </Link>
                    </div>
                </>
            )}
        </>
    )
}

