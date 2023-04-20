import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

import { HeaderComponent } from './Layout/Header';
import { FooterComponent } from './Layout/Footer';
import AdminHomePage from './Pages/AdminHomePage';
import PageNotFound from './Pages/PageNotFound';
import { ROUTE_PATH } from './utils/constants';
import CadetPage from './Pages/AdminPages/CadetPage';
import CampPage from './Pages/AdminPages/CampPage';
import EditCampPage from './Pages/AdminPages/Camp/EditCampPage';
import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import EventPage from './Pages/AdminPages/EventPage';
import ProfileView from './Pages/CadetPages/ProfileView';
import PrivateRoute from './Pages/PrivateRoute';
import HomePage from './Pages/HomePage';
// import {useNavigate} from 'react-router-dom'

function App() {
// const navigate=useNavigate()
  useEffect(()=>{
// if(localStorage.getItem('admin')){
//   window.location.href='/admin'
// }
  },[])

  let token=localStorage.getItem('admin')
  

  const router = createBrowserRouter([
    {
       path:ROUTE_PATH.home,
       element:(
        // <></>
        <HomePage />
       )
    },
    
    {
      path: ROUTE_PATH.admin,

      element: (
    //  <PrivateRoute>
         <AdminHomePage />
    //  </PrivateRoute>
      
      
      ),
    },  
    {
      path: ROUTE_PATH.cadetPage,
      element: (
         <>
         <ProfileView />
         </>
      ),
     
    },
    {
      path: ROUTE_PATH.event,
      element: (
         <>
        <EventPage />
         </>
      ),
     
    },
    {
      path: ROUTE_PATH.camp,
      element: (
         <>
        <CampPage />
         </>
      ),
     
    },
    
    {
      path:'*',
      element: <PageNotFound />,
    },
    
  ])
  
 
   

  
  return (
   <>
   <HeaderComponent />
   <RouterProvider router={router} />
  
{/* <EditCampPage /> */}

{/* <CadetPage /> */}




  {/* <AdminHomePage /> */}

   <FooterComponent />

   </>
  );
}


export default App;
