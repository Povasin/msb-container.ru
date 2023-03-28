import React, {useEffect,useState} from 'react'
import {orderSliceClient, getordersAdmin} from "../shared/store/slices/orderClient"
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';
import OrdersCard from '../shared/componets/OrdersCard';
import "./scss/ordersPage.scss"

export default function OrdersPage() {
  const orders = useSelector((state)=>state.orderSliceClient)
  const [orderFilter, setOrderFilter] = useState("Все")
  function countOrders() {
        const order = orders?.items.filter((card)=>!card.orderCollect && !card.orderAccepted && !card.orderGo && !card.orderReceived)
        return order.length
  } 
  function filterFunc() {
    if (orderFilter == "Все") {
      return orders?.items
    } else if (orderFilter == "Новые") {
      return orders?.items.filter((card)=>!card.orderCollect && !card.orderAccepted && !card.orderGo && !card.orderReceived)
    } else if (orderFilter == "Активные") {
      return orders?.items.filter((card)=>card.orderCollect || card.orderAccepted || card.orderGo)
    } else if (orderFilter == "Доставленные") {
      return orders?.items.filter((card)=>card.orderCollect && card.orderAccepted && card.orderGo && card.orderReceived)
    }
  }
  useEffect(()=>{
    store.dispatch(getordersAdmin({}))
  }, [])
  return (
    <div>
      <div className='headerOrder'onClick={filterFunc} >
          <a onClick={()=>setOrderFilter("Все")}>все заказы</a>
          <a onClick={()=>setOrderFilter("Активные")}>активные</a>
          <a onClick={()=>setOrderFilter("Доставленные")}>доставленные</a>
          <a onClick={()=>setOrderFilter("Новые")}><img src="/bagHeader.svg" alt="корзина"/><div className="services__sum"><p>{countOrders() ?? 0}</p></div>Новые</a>
      </div>
      <h1>{orderFilter} заказы</h1>
      <div className="orders">
        { filterFunc().length != 0 ?  filterFunc().map((item, index)=><OrdersCard key={index} orderFilter={orderFilter}  item={item}/>) :  <div className="order__clear">
            <h2>заказов пока нет</h2>
            <p>для обнавление заказов перезагрузите сайт</p>
        </div>}
      </div>
    </div>
  )
}
