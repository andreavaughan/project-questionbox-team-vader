import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import '../styles/add-question.css'

export const AddQuestion = () => {
    const [ newQuestionTitle, setNewQuestionTitle ] = useState('')
    const [ details, setDetails ] = useState('')
    // const [ qAuthor, setQAuthor ] = useState('')
    const history = useHistory()
    
    const handleChange = (inputType, event) => {
        if (inputType === 'newQuestionTitle'){
            setNewQuestionTitle(event.target.value)
        }
        if (inputType === 'details'){
            setDetails(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('https://questionbox1.herokuapp.com/api/questions/',
            {
                "question": newQuestionTitle,
                "details": details,
                // author: qAuthor
            })
            .then(response => {
                console.log(response)
                console.log(response.status)
                if (response.status === 201) {
                    console.log('question created!')
                    history.push('/')
                }
            })
    }

    return (
        <>
            <form className='form question-form' onSubmit={handleSubmit}>
                <label className="label">Ask your question:</label>
                <input 
                    className="input form-control"
                    type="text"
                    value={newQuestionTitle}
                    onChange={(event) => handleChange('newQuestionTitle', event)}
                />
                <label className="label">Details:</label>
                <textarea 
                    className="input form-control"
                    type="text"
                    value={details}
                    onChange={(event) => handleChange('details', event)}
                />
                <button type="submit" className="btn btn-secondary">Submit question</button>
                <button className="btn btn-light">Cancel</button>
            </form>
        </>
    );
}

