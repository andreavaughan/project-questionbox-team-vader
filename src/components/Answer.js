import React from 'react';

export const Answer = ({ token, answer}) => {
    return (
        <>
            <div className="card" key={answer.pk}>
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
        </>
    );
}

