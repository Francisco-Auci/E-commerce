import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '././assets/css/icofont.min.css';
import '././assets/css/animate.css';
import '././assets/css/style.min.css';  
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './home/Home.jsx';
import Shop from './shop/Shop.jsx';
import SingleProducts from './shop/SingleProducts.jsx';
import CartPage from './shop/CartPage.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Login from './components/Login.jsx';
import Singup from './components/Singup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      { 
        path: "/", 
        element: <Home /> 
      },
      { 
        path: "/shop", 
        element: <Shop /> 
      },
      { 
        path: "/shop/:id", 
        element: <SingleProducts /> 
      },
      {
        path: "/cart-page",
        element: <PrivateRoute><CartPage /></PrivateRoute>
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "sing-up",
    element: <Singup/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
)
