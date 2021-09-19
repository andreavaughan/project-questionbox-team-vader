import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../styles/questions.css'

export const Questions = ({ token, isLoading, setIsLoading }) => {
    const [ questions, setQuestions ] = useState([])

    useEffect(() => {
        let isMounted = true

        axios
            .get('https://questionbox1.herokuapp.com/api/questions/')
            .then((response) => {
                if (isMounted) {
                    setQuestions(response.data)
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
            <div className="home-header">
                { token
                    ? <Link to="/ask-question">
                        <button type="button" className="btn btn-secondary btn-lg">Ask a question</button>
                    </Link>
                    : <h2>Welcome to questionbox!</h2>
                }
            </div>
            <div className="q-body">
                { questions && questions.map((question, idx) => {
                    return (
                    <div className="card" key={idx}>
                        <div className="card-body">
                            <blockquote className="blockquote">
                                <p>{question.question}</p>
                            </blockquote>
                            <p>{question.details}</p>
                        </div>
                        <div className="card-footer text-muted q-detail">
                            <p>Added: {question.created_date}</p>
                            <p>Submitted by: {question.author}</p>
                            <button className="btn btn-light">
                                View answers
                            </button>
                        </div>
                    </div>)
                })}
            </div>
        </>
    );
}

