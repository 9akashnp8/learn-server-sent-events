import { FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      userMessage: { value: string };
    };
    const result = await fetch('http://127.0.0.1:8000/stream', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: target.userMessage.value})
    })
    if (result.ok) {
      console.log(result.json())
    }
  }

  useEffect(() => {
    const evntSource = new EventSource("http://127.0.0.1:8000/stream", {
      withCredentials: true,
    })

    evntSource.onmessage = (event) => {
      setCount((prev) => prev + event.data)
    }

    return () => evntSource.close()
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="userMessageForm" onSubmit={handleSubmit}>
        <form method="POST">
          <input type="text" name='userMessage' />
          <br />
          <button type='submit'>Send</button>
        </form>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ul id='list'>

      </ul>
    </>
  )
}

export default App
