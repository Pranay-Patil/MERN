import React from 'react'
import { useNavigate } from 'react-router-dom'

 const Error = () => {

    const navigate = useNavigate()
  return (
    
    <div className='title'>
        {/* <div className='back-btn btn btn-outline-dark' onClick={()=>{navigate('/home')}}>Back</div> */}
        <h1 className='un-auth'>401</h1>
        <h2>Not Found</h2>
    </div>
  )
}

export default Error