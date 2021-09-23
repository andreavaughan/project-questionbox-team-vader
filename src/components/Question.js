import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/question.css'


export const Question = ({ question, setQuestionID, token }) => {
    return (
        <div>
            <div className="card">
                <div className="card-header q-header">
                    Question
                </div>
                <div className="card-body">
                    <blockquote className="blockquote">
                        <h3>{question.question}</h3>
                    </blockquote>
                    <p>{question.details}</p>
                </div>
                <div className="card-footer text-muted q-detail">
                    <p>Added: {question.created_date}</p>
                    <p>Submitted by: {question.author}</p>
                    { token ?
                        <Link to="/question-detail">
                            <button className="btn btn-outline-secondary" onClick={() => setQuestionID(question.pk)}>
                                View answers
                            </button>
                        </Link> :
                        <Link to="/login">
                            <button className="btn btn-outline-secondary">
                                Login to view answers
                            </button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}

