import React,{useState,useEffect,useRef} from 'react'
import {FaTrash} from 'react-icons/fa'
import  { AiOutlinePlus,AiOutlineMinus } from 'react-icons/ai'
import  { RiDeleteBin6Fill, RiNumbersFill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const navigate = useNavigate()
    const [products,setProducts] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [discount,setDiscount] = useState(0)
    const [coupon,setCoupon] = useState('')
    const [subtotal,setSubtotal] = useState(0)

     useEffect(() => {
        axios
        .get("http://localhost:8000/cart/showcart",
        {
        headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
      })
        .then((res) => {

            setProducts([...res.data])
        });
        let total=0;
        products.map((item)=>{
            total+=item.price*item.quantity
        })
        setTotalPrice(total)
    }, [products])

  const deleteItem = (productId) => {

      axios.delete(`http://localhost:8000/cart/deletefromcart/${productId}`,
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }
  const handleIncrement =(productId) =>{
      axios.put(`http://localhost:8000/cart/incrementquantity/${productId}`,{},
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }
  const handleDecrement =(productId) =>{
      axios.put(`http://localhost:8000/cart/decrementquantity/${productId}`,{},
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
  }
    const showCoupon =() =>{
        document.querySelector('#apply-btn').style.display = 'none'
        document.querySelector('.show-coupon').style.display = 'block'
    }
    const handleCoupon =(e) =>{
        setCoupon(e.target.value)
    }
    const applyCoupon = async () => {
        const dis = await axios.post(`http://localhost:3008/discount`,{
      couponName:coupon
    })
    if(dis){
        setDiscount((totalPrice*(dis.data.couponDiscount)/100))
    }
    }
    const handleCheckout = async () => {

      axios.post(`http://localhost:3006/checkout`,{},
        {
            headers:{Authorization:"Bearer "+localStorage.getItem("login_user")}
        }).then((res)=>{console.log()}).catch((err)=>console.log(err))
        alert('You have bought all the items !!Thanks')
        navigate('/')
    }


  return (
    
    <div className='cart'>
        <div className='title'>
              <h1>Cart</h1>
              <div className='title-underline'></div>
        </div>
      
        <div className='space' ></div>
        <div className='cart-container'>
            <div className='cart-items-container'>
                <div className='cart-headings'>
                    <section>
                        <h5>Item</h5>
                        <h5>Price</h5>
                        <h5>Quantity</h5>
                        <h5>Subtotal</h5>
                        <h5>Remove</h5>
                    </section>
                    <hr/>
                </div>
                <div className='cart-items'>
                    {
                        products.map((product)=>{
                            return <>
                                
                                <div className='title'>
                        <img src="https://dl.airtable.com/.attachmentThumbnails/530c07c5ade5acd9934c8dd334458b86/cf91397f?ts=1660829807&userId=usrQMwWEPx18KgLcP&cs=fb5e0d5d84ffd9ed" width='100px' height='80px' />
                        <div>
                            <h5 className='name'>{product.title}</h5>
                            {/* <p>In Stock</p> */}
                        </div>
                        
                    </div>
                    <h5 className='price'>${product.price}</h5>
                    <div className='cart-controller'>
                        <div>
                            <button onClick={()=>{handleDecrement(product._id)}} style={{border:'none',background:'none'}}>
                                <AiOutlineMinus className='icon'/>
                            </button>
                        </div>
                        <span className='number'>{product.quantity}</span>
                        <div>
                        <button onClick={()=>{handleIncrement(product._id)}} style={{border:'none',background:'none'}}>
                        <AiOutlinePlus className='icon'/>
                        </button>
                        </div>
                    </div>
                    <h5 className='subtotal'>${product.quantity*product.price}</h5>
                    <button
                        onClick={()=>{deleteItem(product._id)}}
                        type='button'
                        className='cart-rm-btn'
                    >
                        <RiDeleteBin6Fill />
                    </button>
                            </>
                        })
                    }
                </div>
            </div>
            <hr/>
            <div className='cart-totals'>
                <article>
                    <h5 className='ct-h5'>subtotal : <span>${totalPrice}</span></h5>
                    <div className='before-coupon'>
                        <Button id='apply-btn' onClick={showCoupon} color="secondary">Apply Coupon</Button>
                        <span></span>
                    </div>
                    <div  style={{display:'none'}} className='show-coupon'>
                        <TextField onChange={handleCoupon} id="standard-basic" label="Enter coupon code" variant="standard" />
                        <Button onClick={applyCoupon} variant="text" color='error'>Apply</Button>
                    </div>
                    <p className='ct-p'>Discount : <span>${parseInt(discount)}</span></p>
                    <hr />
                    <h4 className='ct-h4'>Order total :<span>${parseInt(totalPrice-discount)}</span></h4>
                </article>
                <button onClick={handleCheckout} className='btn btn-info ct-btn'>Checkout Or Buy</button>
                <div className='space' ></div>
            </div>
            </div>
        </div>
  

  )
}

export default Cart;