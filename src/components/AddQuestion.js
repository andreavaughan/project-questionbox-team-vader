import React, { useState } from 'react';

export const AddQuestion = () => {
    const [ newQuestion, setNewQuestion ] = useState('')
    
    const handleChange = (inputType, event) => {
        if (inputType === 'newQuestion'){
            setNewQuestion(event.target.value)
        }
    }

    return (
        <>
            <form>
                <label className="label">Ask your question:</label>
                <textarea 
                    className="input form-control"
                    type="text"
                    value={newQuestion}
                    onChange={(event) => handleChange('newQuestion', event)}
                />
                <button className="btn btn-secondary">Submit question</button>
                <button className="btn btn-light">Cancel</button>
            </form>
        </>
    );
}

