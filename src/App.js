import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../src/Components/Home/Home';
import About from '../src/Components/About/About';
import Cart from '../src/Components/Cart/Cart';
import ProductDetails from '../src/Components/ProductDetails/ProductDetails';
import Login from '../src/Components/Login/Login';
import Register from '../src/Components/Register/Register';
import Categories from '../src/Components/Categories/Categories';
import Products from '../src/Components/Products/Products';
import NotFound from '../src/Components/NotFound/NotFound';
import Brands from '../src/Components/Brands/Brands';




function App() {

let routers=createBrowserRouter([
  { path:"",element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:"About",element:<About/>},
    {path:"cart",element:<Cart/>},
    {path:"categories",element:<Categories/>},
    {path:"brands",element:<Brands/>},
    {path:"products",element:<Products/>},
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},
    {path:"*",element:<NotFound/>},

  ]
}])



  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
