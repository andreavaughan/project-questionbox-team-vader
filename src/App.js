import React, { useState } from 'react'
import { questions as data } from './test-data'
import { Nav } from './components/Nav'
import { Questions } from './components/Questions'

export const App = () => {
    const [questions] = useState(data)

    return (
        <div className="">
            <Nav />
            <Questions questions={questions} />
        </div>
    )
}