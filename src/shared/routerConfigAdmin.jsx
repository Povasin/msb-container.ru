import React from 'react'
import LayoutAdmin from '../widgits/LayoutAdmin';
import OrdersPage from "../pages/OrdersPage"
import Chat from "../pages/Chat"
import OrdersPageNumber from "../pages/OrdersPageNumber"
import LoginPageAdmin from '../pages/LoginPageAdmin';
import ActiveCard from '../pages/ActiveCard';
import PeoplePage from '../pages/PeoplePage';
import CreatePeoplePage from '../pages/CreatePeoplePage';
import CardsAdmin from '../pages/CardsAdmin';
import RenamePeople from '../pages/RenamePeople';

const RouterConfigAdmin = {OrdersPage: {path: "/admin/order", element: <LayoutAdmin><OrdersPage/></LayoutAdmin>}, CreatePeoplePage: {path: "/admin/CreatePeople", element: <LayoutAdmin><CreatePeoplePage/></LayoutAdmin>}, PeoplePage: {path: "/admin/people", element: <LayoutAdmin><PeoplePage/></LayoutAdmin>}, ActiveCard: {path: "/admin/activeCard", element: <LayoutAdmin><ActiveCard/></LayoutAdmin>}, Chat: {path: "/admin/chat", element: <LayoutAdmin><Chat/></LayoutAdmin>}, OrdersPageNumber: {path: "/admin/order/:id/:id", element: <LayoutAdmin><OrdersPageNumber/></LayoutAdmin>}, admin: {path: "/admin", element: <LayoutAdmin><LoginPageAdmin/></LayoutAdmin>}, cardsAdmin: {path: "/admin/cards/:id", element: <LayoutAdmin><CardsAdmin/></LayoutAdmin>}, RenamePeople: {path: "/admin/poeple/:id", element: <LayoutAdmin><RenamePeople/></LayoutAdmin>}}

export default RouterConfigAdmin 