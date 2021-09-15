import React, { useState } from 'react'
import { questions as data } from './test-data'
import { Questions } from './components/Questions'

export const App = () => {
    const [questions] = useState(data)

    return (
        <div className="">
            <h1>Project Questionbox</h1>
            <Questions questions={questions} />
        </div>
    )
}