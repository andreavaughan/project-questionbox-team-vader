import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const AddQuestion = () => {
    const [ newQuestion, setNewQuestion ] = useState('')
    const [ qAuthor, setQAuthor ] = useState('')
    const history = useHistory()
    
    const handleChange = (inputType, event) => {
        if (inputType === 'newQuestion'){
            setNewQuestion(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('https://questionbox1.herokuapp.com/api/questions/',
            {
                question: newQuestion,
                author: qAuthor
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
                <textarea 
                    className="input form-control"
                    type="text"
                    value={newQuestion}
                    onChange={(event) => handleChange('newQuestion', event)}
                />
                <button type="submit" className="btn btn-secondary">Submit question</button>
                <button className="btn btn-light">Cancel</button>
            </form>
        </>
    );
}

