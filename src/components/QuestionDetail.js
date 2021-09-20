import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { questions as questionDetail } from '../test-data'

export const QuestionDetail = ({ token, questionID, isLoading, setIsLoading, userId }) => {
    const [ questionDetail, setQuestionDetail ] = useState([])

    useEffect(() => {
        let isMounted = true
        isLoading = true

        axios
            .get(`https://questionbox1.herokuapp.com/api/questions/${questionID}/detail/`)
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
    
    // console.log(typeof(questionDetail.answers))

    const handleDelete = (event) => {
        console.log(event.target.id)
        
        return axios.delete(`https://questionbox1.herokuapp.com/api/questions/${event.target.id}`, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        .then((res) => console.log(res))
    }

    return (
    // isLoading ?
    //     <>
    //         <strong>Loading...</strong>
    //         <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
    //     </> :
    (
        <>
            {/* { questionDetail && ( */}
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
                                { userId === questionDetail.id ? 
                                    <button className="btn btn-dark" id={questionDetail.pk} 
                                    onClick={(event) => handleDelete(event)}> Delete
                                    </button> :
                                    <button className="btn btn-dark" id={questionDetail.pk} 
                                    onClick={(event) => handleDelete(event)} disabled> Delete
                                    </button>
                                }                                             
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Answers</h2>
                        <div className="a-body">
                            { questionDetail.map((question) => question.answers.map((answer, idx) => {
                                <div className="card" key={idx}>
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
                            }))}
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-secondary">+ Add Answer</button>
                    </div>
                </>
            
        </>
    ))
}

