import React, { useState, useContext, useReducer, useEffect } from 'react'

const AppContext = React.createContext()


const AppProvider = ({ children }) => {

const [userRole,setUserRole] = useState('user')
const [updatedProduct,setUpdatedProduct] = useState({})

const changeRole = (role) => {
    setUserRole(role)
}
const changeProduct = (product) => {
  setUpdatedProduct(product)
}

  return (
    <AppContext.Provider value={{changeRole,userRole,updatedProduct,changeProduct}}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
