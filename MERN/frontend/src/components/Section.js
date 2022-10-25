import React from 'react'
import { useNavigate } from 'react-router-dom';

const Section = () => {
    const navigate = useNavigate()
  return (
        <div className='section-container'>
            <div className='section-main'>
                <div className='title section-title'>
                    <h1>Featured Products</h1>
                    <div className='title-underline-sec'></div>
                </div>
                <div className='section-row'>
                    <div className='item-1'>
                            <img className='section-img' src='https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600'></img>
                            <h5>Armchair</h5>
                    </div>
                    <div className='item-2'>
                            <img className='section-img' src='https://dl.airtable.com/.attachmentThumbnails/a2f371071cf292badbb621294758b600/ca963b31?ts=1660829807&userId=usrQMwWEPx18KgLcP&cs=5bcbd0c4d533f7cb'></img>
                            <h5>Leather Sofa</h5>
                    </div>
                    <div className='item-3'>
                            <img className='section-img' src='https://dl.airtable.com/.attachmentThumbnails/c9d46754faf94d2283e15ac3b8accb9a/a6c343c8?ts=1660829807&userId=usrQMwWEPx18KgLcP&cs=050fdec966e6af79'></img>
                            <h5> Simple Chair</h5>
                    </div>
                    <button onClick={()=>{navigate('/products')}} className='btn btn-outline-dark section-btn'><p>Check Products</p></button>
                </div>
            </div>
        </div>
  )
}

export default Section;