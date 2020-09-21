import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [views, setViews] = useState(0)

  const getviews = async () => {
    const views = await axios.get('/api/views')
    console.log('views:', views)
    // console.log()
    if (views.data) {
      setViews(views.data)
    } else {
      setViews('some error occured while fetching the views from the server')
    }
  }

  useEffect(() => {
    getviews()
  }, [])
  return (
    <div className='App'>
      <h1>Total page views are:{views}</h1>
    </div>
  )
}

export default App
