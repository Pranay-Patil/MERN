import React from 'react'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate()
  return (
        <div className='hero-container'>
            <div className='hero-holder row'>
                <div className='banner col'>
                    <div className='hero-detail'>
                        <h1>
                            Online Shopping Destination
                        </h1>
                        <p>If you wait until you have enough money to decorate and make your home your own, it will never happen. If you wait until you can afford to buy everything new, you are missing the point. It is the old, the new, the hand-me-down, the collected, the worn but loved things in your home that make it your own</p>
                        <button onClick={()=>navigate('/products')} className='btn btn-outline-dark'>SHOP NOW</button>
                    </div>
                </div>
                <div className='hero-image col'>
                    <img className='main-image' src='https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=600' alt='main-pic'></img>
                    <img className='small-image' src='https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600' alt='small-pic'></img>
                    <div className='image-back'></div>
                </div>
            </div>
        </div>
  )
}

export default Hero;