import React, {useEffect} from 'react'
import "./adminScss/sideBar.scss"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {OrdersSlice} from "../shared/store/slices/orders"
import {exit, authSlice} from "../shared/store/slices/auth"
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';
import { useState } from 'react';
export default function SideBar() {
  const location = useLocation()
  const orders = useSelector((state)=>state.OrdersSlice)
  const navigate = useNavigate()
  const user = useSelector((state)=>state.authSlice)
  function countOrders() {
    for (let i = 0; i < orders?.items.length; i++) {
     const order = orders?.items[i].orderMass.filter((card)=>!card.orderCollect.status && !card.orderAccepted.status && !card.orderGo.status && !card.orderReceived.status)
      return order.length
    }
  }
  async function exit() {
    return new Promise((resolve, reject) => {
        resolve(store.dispatch(authSlice.actions.exit()))
    }).then(()=>{navigate("/")})
  }
  return (
    <aside>
        <div className="logo">
            <img alt="логотип"  src="/iconPWA/logo96x96.svg"/>
            <a href="https://msb-container.ru/" className="logo">MSB<span>container</span></a>
        </div>
        <div className='pages'>
            <Link to="/admin/order" className={`pages__page ${location.pathname.split("/")[1] == "order" && "active"}`}>
              <img src="/order.svg" alt="заказы"/>
              <p>Заказы</p>
              { countOrders() != undefined && countOrders() != 0 &&  <div className='circle'><span>{countOrders()}</span></div>}
            </Link>
            <Link to="/admin/chat"  className={`pages__page ${location.pathname.split("/")[1] == "chat" && "active"}`}>
              <img src="/chat.svg" alt="чат"/>
              <p>Чат</p>
              <div className='circle'><span>1</span></div>
            </Link>
            {user?.userData?.role == "Администратор" &&  <>
              <Link to="/admin/activeCard"  className={`pages__page ${location.pathname.split("/")[1] == "activeCard" && "active"}`}>
                <img src="/card.svg" alt="карточки"/>
                <p>Карточки</p>
              </Link>
              <Link to="/admin/people"  className={`pages__page ${location.pathname.split("/")[1] == "people" && "active"}`}>
                <img src="/people.svg" alt="карточки"/>
                <p>Сотрудники</p>
              </Link>
            </>}
            <div onClick={exit} className="pages__page">
              <img src="/logout.svg" alt="выйти"/>
              <p>Выйти</p>
            </div>
        </div>
    </aside>
  )
}
