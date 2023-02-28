import React, {useEffect} from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import {useNavigate, useLocation, Link,} from 'react-router-dom'
import { OrdersSlice, changeOrderCard} from '../shared/store/slices/orders';
import { OrdersCardSlice, getOrdersCards} from '../shared/store/slices/ordersCard';
import { store } from '../shared/store/slices/store';
import "./scss/OrdersPageNumber.scss"

export default function  OrderCardPage() {
    const isLoading = useSelector((state)=>state.OrdersSlice.isLoading)
    const userData = useSelector((state)=>state.authSlice)
    const orders = JSON.parse(localStorage.getItem("orders")) 
    const location = useLocation()
    const user = orders.find((item)=>item.id == location.pathname.split("/")[2])
    const [orderDateForDelivery, setOrderDateForDelivery] = useState("")
    const [isChanged, setIsChanged] = useState(false)
    const ordercard = useSelector((state)=>state.OrdersCardSlice) 
    const [item, setItem] = useState(ordercard.items) 
    function OrderPrice() {
        let summ = 0;
        item?.mass.forEach(array=>{
            summ+= (array.count*array.data.price )*array.month 
        })
        return summ
    }
    console.log(item)
    function OrderDiscount() {
        let summ = 0;
        item?.mass.forEach(array=>{
            summ+= (array.count*array.data.discount )*array.month 
        })
        return summ
    }
    function changeItem(key) {
        let date = new Date() 
        setIsChanged(true)
        setItem({...user, delivery: item.delivery, date: orderDateForDelivery, number: item.number, [key]:  `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${date.getMonth()+1 < 10 ?  `0${date.getMonth()+1}` : date.getMonth()+1}.${date.getFullYear()}`})
    }
    useEffect (()=>{
        store.dispatch(getOrdersCards({id: user.id, number:  user.number}))
    }, [])
  return (
    <div>
        <div className='userHtml'>
            <h1>заказ №{item?.number}</h1>
            <div className="order">
            {item?.mass.map((array)=>
            <div key={array.id} className="bag__block">
                 <a href={`https://msb-container.ru/card/${array.id}`}><img  src={array.data.img[0].src} alt={array.data.name}/></a>  
                <div className="block__content">
                <p className="rent">Аренда</p>
                <a className="OrderName"  href={`https://msb-container.ru/card/${array.id}`}>{array.data.name}</a>
                    <div className="block__inputRow">	
                        <div className="block__input">	
                            <p className="fd-col">количество: <span>{array.count}шт</span></p>		
                            <p className="fd-col">срок Аренды: <span>{array.month}мес</span></p>
                        </div>
                        <div className="block-col">
                            <p className="block__discount">{(array.count*array.data.discount)*array.month}</p>
                            <p className="block__price" name="priceOrder">{(array.count*array.data.price)*array.month}₽</p>
                        </div>
                    </div>
                </div>
            </div>
            )}
            </div>
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
                <p className='rent'> Способ получения: </p>
                <span>{item?.delivery == "самовызов" ? item?.delivery : `г. ${item.delivery.city} ул. ${item.delivery.house} `}</span>
            </div>
            <div className="input__date">
                <p>Дата для {item?.delivery == "самовызов" ?  "самовызова" : "доставки"} </p>
                <input type="text" onChange={(e)=>setOrderDateForDelivery(e.target.value)} placeholder="Например 20.01.23" value={item?.date}/>
            </div>
            <h2>Отслеживание заказа</h2>
                <div className="orders__track">
                    <div className="orders__trackInfo">
                        <div className="orders__trackInfoCol">
                            <p>заказ принят</p>
                            <p className="date">{!item?.orderAccepted.date ? "x" : item?.orderAccepted.date}</p>
                            <div className={`borderRadius ${!item?.orderAccepted.status ? "" : "active"}`} onClick={()=>changeItem("orderAccepted")}>{item?.orderAccepted.status && <img src="/tick.svg" alt="галочка"/>}</div>
                        <div className={`border ${!item?.orderAccepted.status ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol">
                            <p>заказ собирается</p>
                            <p className="date">{!item?.orderCollect.date ? "x" : item?.orderCollect.date}</p>
                            <div className={`borderRadius ${!item?.orderCollect.status ? "" : "active"}`} onClick={()=>changeItem("orderCollect")}>{item?.orderCollect.status && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!item?.orderCollect.status ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol1">
                            <p>заказ в пути</p>
                            <p className="date">{!item?.orderGo.date ? "x" : item?.orderGo.date}</p>
                            <div className={`borderRadius ${!item?.orderGo.status ? "" : "active"}`} onClick={()=>changeItem("orderGo")}>{item?.orderGo.status && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!item?.orderGo.status ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol">
                            <p>заказ получен</p>
                            <p className="date">{!item?.orderReceived.date ? "x" : item?.orderReceived.date}</p>   
                            <div className={`borderRadius ${!item?.orderReceived.status ? "" : "active"}`} onClick={()=>changeItem("orderReceived")}>{item?.orderReceived.status && <img src="/tick.svg" alt="галочка"/>}</div>
                        </div>
                    </div>
                </div>
            </div>   
            <div className="chatAndChange">
                <button className="writeToShop">написать продавцу</button>
                <button className={`change ${isLoading && "loading"}`} disabled={isLoading} onClick={()=>store.dispatch(changeOrderCard({email: user.email, body: item})) }>{!isChanged && !isLoading ? "сохраненно" :  !isLoading ? "сохранить" : "загрузка"}</button>
            </div>
        </div>
    </div>
    
  )
}
