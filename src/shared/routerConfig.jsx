import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import LayOut from '../widgits/LayOut';
import MainPage from '../pages/MainPage';
import KatalogPage from "../pages/KatalogPage"
import BagPage from "../pages/BagPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import AboutUsPage from "../pages/AboutUsPage"
import ServicesPage from "../pages/ServicesPage"
import ContactPage from "../pages/ContactPage"
import GallaryPage from "../pages/GallaryPage"
function OrderPage() {
    const params = useParams()
    const location = useLocation()
    console.log(location);
  return (
    <div>routerConfig</div>
  )
}

const RouterConfig = {main: {path: "/", element: <LayOut><MainPage/></LayOut>   }, bag:{path: "/bag", element: <LayOut><BagPage/></LayOut>}, order:{path: "/order/:id", element: <OrderPage/>}, admin:{path: "/admin", element: <div>admin</div>}, login:{path: "/login", element: <LayOut><LoginPage/></LayOut>}, register:{path: "/register", element: <LayOut><RegisterPage/></LayOut>}, katalog:{path: "/katalog", element: <LayOut><KatalogPage/></LayOut>}, aboutUs:{path: "/aboutUs", element: <LayOut><AboutUsPage/></LayOut>}, services:{path: "/services", element: <LayOut><ServicesPage/></LayOut>}, contact:{path: "/contact", element: <LayOut><ContactPage/></LayOut>}, gallary:{path: "/gallary", element: <LayOut><GallaryPage/></LayOut>}}

export default RouterConfig