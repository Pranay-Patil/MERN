import React,{useEffect, useState} from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Modala from './Modala'
import Alert from './Alert'


 const Products = () => {
    
    const navigate = useNavigate()
    const [searchItem,setSearchItem] = useState("")
    const [products,setProducts] = useState([])
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
    const [productArray, setProductArray] = useState([]);
    const [productMainArray, setProductMainArray] = useState([]);

    const [categeryArray, setcategeryArray] = useState([]);
    const [category, setCategory] = useState("all");

    let decodetoken = {user_type:'abi'}
    let token = localStorage.getItem("login_user");
    if (token) {
        decodetoken = jwtDecode(token);
    }
    useEffect(() => {
        if (category === "all") {
        axios.get("http://localhost:8000/product/viewproduct").then((res) => {
            setProducts([...res.data]);
            setProductArray([...res.data]);
            setcategeryArray([...res.data]);
            setProductMainArray([...res.data]);
        });
        } else {
        let prodarray = JSON.stringify(productArray);
            axios
            .post(`http://localhost:8000/product/search-items/${category}`, {
            product_list: prodarray,
            })
            .then((res) => {
            setProducts([...res.data]);
            setcategeryArray([...res.data]);
            });
        }
    }, [products]);
//===========Alert==========================
    const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
//==========New Product======================
    const handleAdd = async (newProduct) => {
        setOpen(false)
        await axios.post('http://localhost:8000/product/addproduct',{
                title: newProduct.title,
                price: newProduct.price,
                description: newProduct.description,
                category: newProduct.category,
                quantity: newProduct.quantity,
                image:newProduct.image
    })
    }
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/product/deleteproduct/${id}`)
    }
//==============Filer by Category==============
const handleClick = (val) => {
    setProductArray(productMainArray);
    setCategory(val);
    console.log(category);
  };

  //Sltoh
  const sortLtoH = () => {
    let prodarray = JSON.stringify(categeryArray);
    axios
      .post("http://localhost:8000/product/sort-items/lowtohigh", {
        product_list: prodarray,
      })
      .then((res) => {
        setProducts([...res.data]);
        setcategeryArray([...res.data]);
        setProductArray([...res.data]);
      });
  };

  const sortHtoL = () => {
    let prodarray = JSON.stringify(categeryArray);
    axios
      .post("http://localhost:8000/product/sort-items/hightolow", {
        product_list: prodarray,
      })
      .then((res) => {
        setProducts([...res.data]);
        setcategeryArray([...res.data]);
        setProductArray([...res.data]);
      });
  };
//=============Wishlist==============
    const handleWishlist = () => {
        showAlert(true, 'success', 'Item added to Wishlist');
        console.log('added to wishlist');
    }
    const updateProduct = (id) => {
    window.location = '/updateproduct/'+id
  }

    return (
        <div className='products-page'>
            <div className='title'>
                <h1>Products</h1>
                <div className='title-underline'></div>
            </div>
            <div class="input-group mb-3 search-bar">
              <input type="text" className="form-control" onChange={(e)=>{setSearchItem(e.target.value)}} placeholder="search bedrooms..."/>
              <span class="input-group-text" id="basic-addon2">search</span>
            </div>
            { category !== 'all' && <div class="dropdown sort-btns">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort By Price
                </button>
                <ul class="dropdown-menu">
                    <li><button onClick={sortLtoH} class="dropdown-item" href="#">Low to High</button></li>
                    <li><button onClick={sortHtoL} class="dropdown-item" href="#">High to Low</button></li>
                </ul>
                </div> }
                    <div>
                        { category === 'all' && decodetoken.user_type === 'admin' && <div className='add-prodkt add-bulk-btns'>
                        <button onClick={handleOpen} className='btn btn-outline-dark'>Add Product</button>
                        <NavLink to='/bulkupload'><button onClick={handleOpen} className='btn btn-secondary'>Bulk Upload +</button></NavLink>
                        </div>}            
                        <Modala handleAdd={handleAdd} open={open} handleClose={handleClose}/>
                    </div>

            <div className='category'>
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button onClick={() => handleClick("all")}
                     type="button" value="all" class="btn btn-outline-dark">All</button>
                    <button onClick={() => handleClick("office")}
                     type="button" value="office" class="btn btn-outline-dark">Office</button>
                    <button onClick={() => handleClick("living room")}
                     type="button" value="living room" class="btn btn-outline-dark">Living room</button>
                    <button onClick={() => handleClick("bedroom")}
                     type="button" value="bedroom" class="btn btn-outline-dark">Bedroom</button>
                    <button onClick={() => handleClick("dining")}
                     type="button" value="dining" class="btn btn-outline-dark">Dining</button>
                    <button onClick={() => handleClick("kids")}
                     type="button" value="kids" class="btn btn-outline-dark">Kids</button>
                </div>
            </div>

            <div className='products-container'>
                {
                    products.filter((product)=>{
                      if(searchItem === "")
                        return product
                      else if(product.title.toLowerCase().includes(searchItem.toLowerCase()))
                        return product
                    }).map((product,index)=>{
                        return <div key={index}  className='product-card'>
                                
                                    <img className='product-image' src={product.image} alt={product.title} width="100%" height="300" />
                                    <div className='product-details'>
                                        <div className='title-price'>
                                            <h5>{product.title}</h5>
                                            <div className='wishlist-icon-price'>
                                                <p>${product.price}</p>                   
                                            </div>
                                            <div className='place-alert'>
                                                {alert.show && <Alert {...alert} removeAlert={showAlert} />}
                                            </div>
                                        </div>
                                    </div>
                                    <NavLink to={`/products/${product._id}`} className=''><button className='ghost'></button></NavLink>
                                    <div className='rm-up-btns'>
                                        { decodetoken.user_type === 'admin' && <div className='remove-prodkt'><button className='btn btn-outline-dark' onClick={()=>handleDelete(product._id)}>Remove</button></div>}
                                        { decodetoken.user_type === 'admin' && <div className='update-prodkt'><button onClick={()=>{updateProduct(product._id)}} className='btn btn-info' >
                                            Update
                                        </button></div>}
                                    </div>
                                </div>
                    })
                    
                }
            </div>
        </div>
    )
    }

export default Products
