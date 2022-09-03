import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'

function App() {
  //state for loading indication
  const [loading,setLoading] = useState(true)
  //state for keeping data that we will fetch
  const [jobs,setJobs] = useState([])
  //state for index of current visible tab
  const [value,setValue] = useState(0)
  //function fetching data
  const fetchJobs = async () => {
    //fetch data
    const response = await fetch(url)
    const data = await response.json()
    //set it to state value
    setJobs(data)
    //turn off loading
    setLoading(false)
  }
  //make an effect, we need to make fetch request once
  useEffect(() => {
    fetchJobs()
  },[])
  //case when loading is true we showing the indication
  if(loading) {
    return <section className='section loading'>
      <h1>loading...</h1>
    </section>
  }
  //dat destructurization should be exactly after if w/ loading cuz before loading will be error
  //cuz initially we have nothing
  //here we destructuring current selected item in jobs array
  const {company,dates,duties,title} = jobs[value]

  //so w/ btn-container we take all our data, go thru it w/ map method
  //inside we making a buttons w/ companies, also setting keys
  //on click we set current index(which represents current job/index/item in array, so when we change value we change visible item, look upper)
  //note spicific class name, first job-btn is like common but after ${index===value && 'active-btn'}
  //so if index is now selected then we add active-btn to class name or else will be added false(which means nothing)
  return (
    <section className='section'>
      <div className='title'>
        <h2>expierence</h2>
        <div className='underline'></div>
      </div>
      <div className='job-center'>
        <div className='btn-container'>
          {
            jobs.map((job,index) => {
              return (
                <button onClick={() => {
                  setValue(index)
                }} 
                className={`job-btn ${index===value && 'active-btn'}`} 
                key={job.id}>
                  {job.company}
                </button>
              )
            })
          }
        </div>

        <article className='job-info'>
          <h3>
            {title}
          </h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map(item => {
            return <div>
              <FaAngleDoubleRight className='job-icon'>
              </FaAngleDoubleRight>
            <p>{item}</p>
            </div>
          })}
        </article>
      </div>
    </section>
  )
}

export default App
