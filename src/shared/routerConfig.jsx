import React from 'react'
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
import CardPage from "../pages/CardPage"
import UserPage from '../pages/UserPage';
import OrderCardPage from '../pages/OrderCardPage';
import FurniturePage from '../pages/FurniturePage';
import ArrangePage from '../pages/ArrangePage';

const RouterConfig = {main: {path: "/", element: <LayOut><MainPage/></LayOut>}, bag:{path: "/bag", element: <LayOut><BagPage/></LayOut>}, login:{path: "/login", element: <LayOut><LoginPage/></LayOut>}, register:{path: "/register", element: <LayOut><RegisterPage/></LayOut>}, katalog:{path: "/katalog", element: <LayOut><KatalogPage/></LayOut>}, aboutUs:{path: "/aboutUs", element: <LayOut><AboutUsPage/></LayOut>}, services:{path: "/services", element: <LayOut><ServicesPage/></LayOut>}, contact:{path: "/contact", element: <LayOut><ContactPage/></LayOut>}, gallary:{path: "/gallary", element: <LayOut><GallaryPage/></LayOut>}, card:{path: "/card/:id", element: <LayOut><CardPage/></LayOut>}, user: {path: "/user/:id", element: <LayOut><UserPage/></LayOut>}, orderCard: {path: "/user/:id/:id", element: <LayOut><OrderCardPage/></LayOut>}, furniture: {path: "/furniture/:id", element: <LayOut><FurniturePage/></LayOut>}, arrange: {path: "/arrange", element: <LayOut><ArrangePage/></LayOut>},}

export default RouterConfig 