import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import data from '../Assets/decor-data'
import { RiDeleteBin5Line } from 'react-icons/ri'
import axios from 'axios'

const Wishlist = () => {

  const [products,setProducts] = useState([])



    useEffect(() => {
        axios
        .get("http://localhost:3001/showwishlist",
        {
        headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
      })
        .then((res) => {

            setProducts([...res.data])
        });
    }, [products])

  const handleClick = () => {

      axios.get(`http://localhost:3001/deletefromwishlist`,
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }

  return (
    <div className='wishlist-container'>
        <div className='title'>
              <h1>Wishlist</h1>
              <div className='title-underline'></div>
        </div>

        <div>
          <div className='products-container'>
                {
                    products.map((product,index)=>{
                        return <div key={index}  className='product-card'>
                                
                                    <img className='product-image' src={product.image} alt={product.title} width="100%" height="300" />
                                    <div className='product-details'>
                                        <div className='title-price'>
                                            <h5>{product.title}</h5>
                                            <div className='wishlist-icon-price'>
                                                <p>${product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <NavLink to={`/products/${product._id}`} className=''><button className='ghost'></button></NavLink>

                                </div>
                    })
                    
                }
        <div className='wishlist-rm-btn'>
          <button onClick={handleClick} className='btn btn-info'>Remove Recent Item <RiDeleteBin5Line /></button>
          
        </div>
            </div>
        </div>
    </div>
  )
}

export default Wishlist;
