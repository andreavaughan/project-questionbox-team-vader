import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const AddAnswer = () => {
    const [ newAnswer, setNewAnswer ] = useState('')
    const [ answerDetails, setAnswerDetails ] = useState('')
    const history = useHistory()
    
    const handleChange = (inputType, event) => {
        if (inputType === 'newAnswer'){
            setNewAnswer(event.target.value)
        }
        if (inputType === 'answerDetails'){
            setAnswerDetails(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('',
            {
                "answer": newAnswer,
                // "details": answerDetails
            })
            .then(response => {
                console.log(response)
                console.log(response.status)
                if (response.status === 201) {
                    console.log('answer added!')
                    history.push('') //change to redirect to question 
                }
            })
    }
    
    return (
        <>
            <form className='form question-form' onSubmit={handleSubmit}>
                <label className="label">Add your answer:</label>
                <input 
                    className="input form-control"
                    type="text"
                    value={newAnswer}
                    onChange={(event) => handleChange('newAnswer', event)}
                />
                <label className="label">Details:</label>
                <textarea 
                    className="input form-control"
                    type="text"
                    value={answerDetails}
                    onChange={(event) => handleChange('answerDetails', event)}
                />
                <button type="submit" className="btn btn-secondary">Submit question</button>
                <button className="btn btn-light" onClick={() => history.push('')}>Cancel</button>
            </form>
        </>
    );
}

