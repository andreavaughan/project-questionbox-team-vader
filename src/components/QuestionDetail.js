import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

export const QuestionDetail = ({ token, questionID, isLoading, setIsLoading }) => {
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
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Answers</h2>
                        
                    </div>
                </>
            )}
        </>
    );
}

