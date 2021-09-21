import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../styles/questions.css'

export const Questions = ({ token, isLoading, setIsLoading, setQuestionID }) => {
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

    console.log(questions)

    return isLoading ?
        <>
            <strong>Loading...</strong>
            <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </> :
        (         
        <>
            <div className="home-header container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    
                        { token
                            ? 
                            <>
                                <Link to="/ask-question">
                                    <button type="button" className="btn btn-secondary btn-lg">Ask a question</button>
                                </Link>
                            </>
                            
                            : <>
                                <div className="col-10 col-sm-8 col-lg-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
                                        <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </div>
                                <div className="col-lg-6">
                                    <h1 className="display-5 fw-bold lh-1 mb-3">Welcome to questionbox!</h1>
                                    <p>See questions and answers, or login to contribute!</p>
                                    <Link to="/login">
                                        <button type="button" className="btn btn-secondary">Login</button>
                                    </Link>
                                </div>
                            </>
                        }
                    
                </div>
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
                            <Link to="/question-detail">
                                <button className="btn btn-outline-secondary" onClick={() => setQuestionID(question.pk)}>
                                    View answers
                                </button>
                            </Link>
                        </div>
                    </div>)
                })}
            </div>
        </>
    );
}

