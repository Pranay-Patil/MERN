import React,{ useState} from 'react'
import Modal from '@mui/material/Modal';


const Modala = ({handleAdd,handleClose,open}) => {
        const [newProduct,setNewProduct] = useState({
        title:'',
        price:'',
        description:'',
        category:'',
        company:'',
        quantity:'',
        image:''
    })
  return (
    
        <Modal open={open} onClose={handleClose}>
                            <form className='form-signup-modal' >
                                    <div className='input-container'>
                                        <label>Title</label>
                                        <input type="text" name='title' className='input-box' 
                                            onChange={(e)=>{setNewProduct({...newProduct,title:e.target.value})}}></input>
                                    </div>
                                    <div className='input-container'>
                                        <label>Price</label>
                                        <input type="text" name='price' className='input-box' 
                                        onChange={(e)=>{setNewProduct({...newProduct,price:e.target.value})}}></input>
                                    </div>
                                    <div className='input-container'>
                                        <label>Description</label>
                                        <textarea type="text" name='description' className='input-box' 
                                        onChange={(e)=>{setNewProduct({...newProduct,description:e.target.value})}}></textarea>
                                    </div>
                                    <div className='input-container'>
                                        <label>Category</label>
                                        <input type="text" name='category' className='input-box' 
                                        onChange={(e)=>{setNewProduct({...newProduct,category:e.target.value})}}></input>
                                    </div>
                                    <div className='input-container'>
                                        <label>Quantity</label>
                                        <input type="text" name='quantity' className='input-box' 
                                        onChange={(e)=>{setNewProduct({...newProduct,quantity:e.target.value})}}></input>
                                    </div>
                                    <div className='input-container'>
                                        <label>Image</label>
                                        <input type="text" name='image' className='input-box' 
                                        onChange={(e)=>{setNewProduct({...newProduct,image:e.target.value})}}></input>
                                    </div>

                                    <button type='button' onClick={()=>{handleAdd(newProduct)}} className='btn btn-info'>Add</button>
                                </form>

                        </Modal>
  )
}

export default Modala