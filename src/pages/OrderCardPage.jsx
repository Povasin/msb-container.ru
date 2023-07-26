import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { authSlice} from '../shared/store/slices/auth';
import {cardsSlice, getCards} from "../shared/store/slices/cards"
import { orderSliceClient, getorder, getOrdersCards } from '../shared/store/slices/orderClient';
import { store } from '../shared/store/slices/store';
import "./scss/user.scss";
import LoadingPageAdmin from './LoadingPageAdmin'

export default function  OrderCardPage() {
    const auth =  useSelector((state)=>state.authSlice)
    const location = useLocation()
    const navigate = useNavigate()
    const ordersClient = useSelector((state)=>state.orderSliceClient)
    const order = ordersClient?.items.find((item)=>item.number == location.pathname.split("/")[3])
    const cards = useSelector((state)=>state.cardsSlice)
    
    function cardsConnectFunc() {
        let cardsConnect = []
         ordersClient?.orderCards.map(item=>{
            cardsConnect = ([...cardsConnect, {data: cards?.items.find((arr)=>item.idCard == arr.idCard), count: item.count , month: item.month}])
        })
        return cardsConnect
    }
    let isCards = cardsConnectFunc()
    
    function OrderPrice() {
        let summ = 0;
        isCards.forEach(array=>{
            summ+= (array.count*array.data?.price )*array.month 
        })
        return summ
    }
    function OrderDiscount() {
        let summ = 0;
        isCards.forEach(array=>{
            summ+= (array.count*array.data?.discount )*array.month 
        })
        return summ
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]) 
    useEffect(()=>{
        ordersClient?.items && store.dispatch(getorder({idUser: auth?.userData?.idUser}))
        ordersClient?.orderCards && store.dispatch(getOrdersCards({idUser: auth?.userData?.idUser, number: location.pathname.split("/")[3]}))
        store.dispatch(getCards({}))
    }, [auth?.userData?.idUser])
  return (
    <main>
        <div className='userHtml'>
            {ordersClient.isLoading ? <LoadingPageAdmin number={1}/> : isCards.map((array)=>
                <div key={array.data?.idCard} className="bag__block">
                 <div className="radius__user">
                    <Link to={`/card/${array.data?.idCard}`} className="block__img"><img src={array.data?.img} alt={array.data?.name}/></Link>
                    </div>
                <div className="block__content">
                <p className="rent">Аренда</p>
                <Link className="orderNumber" to={`/card/${array.data?.idCard}`}> {array.data?.name}</Link>
                    <div className="block__inputRow">	
                        <div className="block__input">	
                            <p className="fd-col">Количество: <span>{array.count}шт</span></p>		
                            <p className="fd-col">Срок Аренды: <span>{array.month}мес</span></p>
                        </div>
                        <div className="block-col">
                            <p className="block__discount">{(array.count*array.data?.discount)*array.month}</p>
                            <p className="block__price" name="priceOrder">{(array.count*array.data?.price)*array.month}₽</p>
                        </div>
                    </div>
                </div>
                </div>
            )}
            <div className="orders__info">
                <div className="input__price">
                        <p>Итого:</p>
                        <span name="summPriceOrder" id="price">{OrderPrice()}₽</span>
                </div>                    
                <div className="input__discount">
                    <p>Без скидки:</p>
                    <span id="discount">{OrderDiscount()}₽</span>
                </div>
                <div className="input__delivery">
                    <p className='input__deliveryRent'>
                        {order?.delivery == "Самовызов" ? `Можно забрать:` : "Cрок доставки:"} 
                    </p>
                        <span>{order?.date == "" && !order?.orderReceived ? "Не указано продавцом" : order?.orderReceived ? "Заказ получен" : order?.date}</span>
                    </div>
                <h2>Отслеживание заказа</h2>
                <div className="orders__track">
                    <div className="orders__trackInfo">
                        <div className="orders__trackInfoCol">
                            <p>заказ принят</p>
                            <p className="date">{!order?.orderAccepted ? "x" : order?.orderAccepted}</p>
                            <div className={`borderRadius ${!order?.orderAccepted ? "" : "active"}`} >{order?.orderAccepted && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!order?.orderAccepted ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol">
                            <p>заказ собирается</p>
                            <p className="date">{!order?.orderCollect ? "x" : order?.orderCollect}</p>
                            <div className={`borderRadius ${!order?.orderCollect ? "" : "active"}`} >{order?.orderCollect && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!order?.orderCollect ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol1">
                            <p>заказ в пути</p>
                            <p className="date">{!order?.orderGo ? "x" : order?.orderGo}</p>
                            <div className={`borderRadius ${!order?.orderGo ? "" : "active"}`} >{order?.orderGo && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!order?.orderGo ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol">
                            <p>заказ получен</p>
                            <p className="date">{!order?.orderReceived ? "x" : order?.orderReceived}</p>
                            
                        <div className={`borderRadius ${!order?.orderReceived ? "" : "active"}`} >{order?.orderReceived && <img src="/tick.svg" alt="галочка"/>}</div>
                        </div>
                    </div>
                </div>
                <button onClick={()=>alert('Чат в разработке!')} className="writeToShop">написать продавцу</button>
            </div>   
        </div>
    </main>
    
  )
}
