import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { authSlice } from '../shared/store/slices/auth';
import { store } from '../shared/store/slices/store';
import "./css/user.scss"
export default function  OrderCardPage() {
    const auth =  useSelector((state)=>state.authSlice)
    const location = useLocation()
    const navigate = useNavigate()
    const orderId = location.pathname.split("/")[3]
    const item = auth.userData?.orderMass.find((item)=>item.number == orderId) ?? navigate("/") 
    console.log(item);
    function OrderPrice() {
        let summ = 0;
        item?.mass.forEach(array=>{
            summ+= (array.count*array.data.price )*array.month 
        })
        return summ
    }
    function OrderDiscount() {
        let summ = 0;
        item?.mass.forEach(array=>{
            summ+= (array.count*array.data.discount )*array.month 
        })
        return summ
    }
  return (
    <main>
        <div className='userHtml'>
            {item?.mass.map((array)=>
                <div key={array.id} className="bag__block">
                    <Link to={`/card/${array.id}`} className="block__imgJS"><img src={array.data.img[0].src} alt={array.data.name}/></Link>
                <div className="block__content">
                <p className="rent">Аренда</p>
                <Link className="orderNumber" to={`/card/${array.id}`}> {array.data.name}</Link>
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
                <p className='rent'>
                    {item?.delivery == "самовызов" ? `можно забрать:` : "срок доставки:"} 
                </p>
                    <span>{item?.date == undefined && !item?.orderReceived ? "не указано продавцом" : item?.orderReceived ? "заказ получен" : item?.date}</span>
                </div>
            <h2>Отслеживание заказа</h2>
            <div className="orders__track">
                <div className="orders__trackInfo">
                    <div className="orders__trackInfoCol">
                        <p>заказ принят</p>
                        <p className="date">{!item?.orderAccepted ? "x" : item?.orderAccepted}</p>
                    </div>
                    <div className="orders__trackInfoCol">
                        <p>заказ собирается</p>
                        <p className="date">{!item?.orderAccepted ? "x" : item?.orderCollect}</p>
                    </div>
                    <div className="orders__trackInfoCol">
                        <p>заказ в пути</p>
                        <p className="date">{!item?.orderAccepted ? "x" : item?.orderGo}</p>
                    </div>
                    <div className="orders__trackInfoCol">
                        <p>заказ получен</p>
                        <p className="date">{!item?.orderAccepted ? "x" : item?.orderReceived}</p>
                    </div>
                </div>
                <div className="orders__trackRadius">
                    <div className={`borderRadius1 ${!item?.orderAccepted ? "" : "active"}`}>{item?.orderAccepted && <img src="/admin/tick.svg" alt="галочка"/>}</div>
                    <div className={`border1 ${!item?.orderAccepted ? "" : "borderActive"}`}></div>
                    <div className={`borderRadius2 ${!item?.orderCollect ? "" : "active"}`}>{item?.orderCollect && <img src="/tick.svg" alt="галочка"/>}</div>
                    <div className={`border2 ${!item?.orderCollect ? "" : "borderActive"}`}></div>
                    <div className={`borderRadius2 ${!item?.orderGo ? "" : "active"}`}>{item?.orderGo && <img src="/tick.svg" alt="галочка"/>}</div>
                    <div className={`border3 ${!item?.orderCollect ? "" : "borderActive"}`}></div>
                    <div className={`borderRadius4 ${!item?.orderReceived ? "" : "active"}`}>{item?.orderReceived && <img src="/tick.svg" alt="галочка"/>}</div>
                </div>
                </div>
                <button className="writeToShop">написать продавцу</button>
            </div>   
        </div>
    </main>
    
  )
}
