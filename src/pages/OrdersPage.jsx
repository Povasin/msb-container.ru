import React, {useEffect,useState} from 'react'
import {OrdersSlice, getorders} from "../shared/store/slices/orders"
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';
import OrdersCard from '../shared/componets/OrdersCard';
import "./scss/ordersPage.scss"

export default function OrdersPage() {
  const orders = useSelector((state)=>state.OrdersSlice)
  const [orderFilter, setOrderFilter] = useState("Все")
  function countOrders() {
      for (let i = 0; i < orders?.items.length; i++) {
        const order = orders?.items[i].orderMass.filter((card)=>!card.orderCollect.status && !card.orderAccepted.status && !card.orderGo.status && !card.orderReceived.status)
        return order.length
      }
  } 
  useEffect(()=>{
    store.dispatch(getorders({}))
  }, [])
  return (
    <div>
      <div className='headerOrder'>
          <a onClick={()=>setOrderFilter("Все")}>все заказы</a>
          <a onClick={()=>setOrderFilter("Активные")}>активные</a>
          <a onClick={()=>setOrderFilter("Доставленные")}>доставленные</a>
          <a onClick={()=>setOrderFilter("Новые")}><img src="/bagHeader.svg" alt="корзина"/><div className="services__sum"><p>{countOrders() ?? 0}</p></div>Новые</a>
      </div>
      <h1>{orderFilter} заказы</h1>
      <div className="orders">
        { orders?.items.length != 0 ?  orders?.items.map((item, index)=><OrdersCard key={index} orderFilter={orderFilter}  item={item}/>) :  <div className="order__clear">
            <h2>заказов пока нет</h2>
            <p>для обнавление заказов перезагрузите сайт</p>
        </div>}
      </div>
    </div>
  )
}
