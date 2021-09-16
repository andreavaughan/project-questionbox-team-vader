import React from 'react';
import { Link } from 'react-router-dom'
import { AddQuestion } from './AddQuestion';
import '../styles/questions.css'

export const Questions = ({ questions }) => {
    console.log(questions)
    
    return (
        <>
            <div className="home-header">
                <Link to="/ask-question">
                    <button type="button" className="btn btn-secondary btn-lg">Ask a question</button>
                </Link>
            </div>
            <div className="q-body">
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
            </div>
        </>
    );
}

