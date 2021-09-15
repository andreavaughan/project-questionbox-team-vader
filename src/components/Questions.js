import React from 'react';
import '../styles/questions.css'

export const Questions = ({ questions }) => {
    console.log(questions)
    
    return (
        <>
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
        </>
    );
}

