import React from 'react'

import { Navigate } from 'react-router-dom'




function PrivateRoute({ children }) {

  const getAuthToken = localStorage.getItem("admin")

let parseToken=JSON.parse(getAuthToken)

console.log("paserse",parseToken);



if(parseToken.token){




  return <Navigate to='/admin' />

}else{

  return <Navigate to="/cadet" />

}




 

}




export default PrivateRoute