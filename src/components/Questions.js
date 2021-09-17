import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../styles/questions.css'

export const Questions = ({ token }) => {
    const [ questions, setQuestions ] = useState(null)

    useEffect(() => {
        axios
            .get(`https://questionbox1.herokuapp.com/api/questions/`)
            .then((response) =>  console.log(response))
    })

    return (
        <>
            <div className="home-header">
                { token
                    ? <Link to="/ask-question">
                        <button type="button" className="btn btn-secondary btn-lg">Ask a question</button>
                    </Link>
                    : <h2>Welcome to questionbox!</h2>
                }
            </div>
            {/* <div className="q-body">
                { questions.map((question, idx) => (
                    <div className="card" key={idx}>
                        <div className="card-body">
                            <blockquote className="blockquote">
                                <p>{question.question}</p>
                            </blockquote>
                        </div>
                        <div className="card-footer text-muted">
                            <p>{question.created_date}</p>
                            <p>{question.author}</p>
                            <button className="btn btn-light">
                                View answers
                            </button>
                        </div>
                    </div>
                ))}
            </div> */}
        </>
    );
}

