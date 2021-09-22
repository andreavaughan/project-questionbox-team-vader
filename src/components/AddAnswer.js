import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const AddAnswer = ({ token, questionID }) => {
    const [ newAnswer, setNewAnswer ] = useState('')
    const history = useHistory()
    
    const handleChange = (inputType, event) => {
        if (inputType === 'newAnswer'){
            setNewAnswer(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('https://questionbox1.herokuapp.com/api/answers/new/',
            {
                "answer": newAnswer,
                "question": questionID
            },
            {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then(response => {
                console.log(response)
                console.log(response.status)
                if (response.status === 201) {
                    console.log('answer added!')
                    history.push('/question-detail')  
                }
            })
    }
    
    return (
        <>
            <form className='form question-form' onSubmit={handleSubmit}>
                <label className="label">Add your answer:</label>
                <textarea 
                    className="input form-control"
                    type="text"
                    value={newAnswer}
                    onChange={(event) => handleChange('newAnswer', event)}
                />
                <button type="submit" className="btn btn-secondary">Submit answer</button>
                <button className="btn btn-light" onClick={() => history.push('')}>Cancel</button>
            </form>
        </>
    );
}

