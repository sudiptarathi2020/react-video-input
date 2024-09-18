import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import VideoCapture from './components/VideoCapture'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

    return (
        <>
            <VideoCapture/>
        </>
    )
}

export default App
