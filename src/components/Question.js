import React from 'react'
import { Link } from 'react-router-dom'


export const Question = ({ question, setQuestionID }) => {
    return (
        <div>
            <div className="card">
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
                    </div>
        </div>
    );
}

