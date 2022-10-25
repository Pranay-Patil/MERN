import React from 'react';
import './App.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import  Home  from './components/Home';
import SharedLayout from './components/SharedLayout'
import Products from './components/Products';
import About from './components/About';
import SingleProduct from './components/SingleProduct';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetails from './components/user_details/UserDetails';
import UserCreate from './components/user_details/CreateUser'
import UserUpdate from './components/user_details/EditUser'
import BulkUpload from './components/bulk_update/BulkUpload';
import Modalm from './components/Modalm';
import Modalu from './components/Modalu';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart'
import {SalesReport} from './components/Salesreport';
import {Stocks} from './components/Stocks'
import { Footer } from './components/Footer';
import Error from './components/Error';
import jwtDecode from 'jwt-decode'

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<SharedLayout/>}>
                <Route index element={<Home/>}></Route>
                <Route path='about' element={<About/>}></Route>
                 <Route path='login' element={<Login/>}></Route>
                 <Route path='signup' element={<Signup/>}></Route>
                <Route path='products' element={<Products/>}></Route>
                 <Route path='userlist' element={<UserDetails/>}></Route>
                 <Route path='create' element={<UserCreate/>}></Route>
                 <Route path='/update/:id' element={<UserUpdate/>}></Route>
                 <Route path='/sendmail/:id' element={<Modalm/>}></Route>
                 <Route path='bulkupload' element={<BulkUpload/>}></Route>
                 <Route path='wishlist' element={<Wishlist/>}></Route>
                 <Route path='cart' element={<Cart/>}></Route>
                <Route path='sales' element={<SalesReport/>}></Route>
                <Route path='stocks' element={<Stocks/>}></Route>
                <Route path='updateproduct/:productId' element={<Modalu/>}></Route>
                <Route path='products/:productId' element={<SingleProduct/>}></Route>
 
                <Route path='*' element={<Error/>}></Route>
              </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
