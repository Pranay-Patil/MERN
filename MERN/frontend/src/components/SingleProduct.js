import React, { useState,useEffect } from 'react'
import { useParams } from "react-router-dom";
import data from '../Assets/decor-data';
import  { AiOutlinePlus,AiOutlineMinus } from 'react-icons/ai'
import axios from 'axios';
import Alert from './Alert';

const SingleProduct = () => {
    const { productId } = useParams()
    // const [products,setProducts] = useState([])
    const [product,setProduct] = useState([])
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  //===========Alert==========================
    const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

    useEffect(() => {
        axios
        .get(`http://localhost:3001/viewsingleproduct/${productId}`)
        .then((res) => {
          console.log(res.data,'res');
            setProduct(res.data)
          });
        }, [])
        // console.log(product);

  const handleWishlist = () => {

      axios.post(`http://localhost:3001/addtowishlist/${productId}`,{},
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
        showAlert(true, 'success', 'Item added to Wishlist !!');
  }
    const addToCart = () => {

      axios.post(`http://localhost:3007/addtocart/${productId}`,{},
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }

  return (
    product.map((item)=>{
          return <div className='container prodkt-container'>
          <div className='addtowsl-alert'>
              {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          </div>
      <div className='row'>
          <div className='prodkt-display col'>
              <img src={item.image} className="prodkt-image-lg"></img>
          </div>
          <div className='prodkt-details col'>
                <h1>{item.title}</h1>
                {/* <h5></h5> */}
                <h5>${item.price}</h5>
                <p className='desc'>{item.description}</p>
                <div className='grid-container'>
                   <span>Available :</span>
                   <div className='quantity'><h5 style={{color:'#D1512D'}}>{item.quantity}</h5><p> items left !</p></div>
                   <span>Brand :</span>
                   <p>Green</p>
                </div>
                <hr/>
                <section>
                  <div className='buttons-sp'>
                  <button onClick={handleWishlist} className='btn btn-light'>ADD TO WISHLIST</button>
                    <button onClick={addToCart} className='btn btn-dark'>ADD TO CART</button>
                    <button className='btn btn-info'>BUY NOW</button>
                  </div>
                </section>
          </div>
      </div>
    </div>
    })
  )
}

export default SingleProduct
