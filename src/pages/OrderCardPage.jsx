import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { authSlice, getOrder } from '../shared/store/slices/auth';
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
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]) 
    useEffect(()=>{
        auth.userData?.email && store.dispatch(getOrder({email:auth.userData.email}))
    }, [auth.userData?.email])
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
                        <span>{item?.date == "" && !item?.orderReceived.status ? "не указано продавцом" : item?.orderReceived.status ? "заказ получен" : item?.date}</span>
                    </div>
                <h2>Отслеживание заказа</h2>
                <div className="orders__track">
                    <div className="orders__trackInfo">
                        <div className="orders__trackInfoCol">
                            <p>заказ принят</p>
                            <p className="date">{!item?.orderAccepted.date ? "x" : item?.orderAccepted.date}</p>
                            <div className={`borderRadius ${!item?.orderAccepted.status ? "" : "active"}`} >{item?.orderAccepted.status && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!item?.orderAccepted.status ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol">
                            <p>заказ собирается</p>
                            <p className="date">{!item?.orderCollect.date ? "x" : item?.orderCollect.date}</p>
                            <div className={`borderRadius ${!item?.orderCollect.status ? "" : "active"}`} >{item?.orderCollect.status && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!item?.orderCollect.status ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol1">
                            <p>заказ в пути</p>
                            <p className="date">{!item?.orderGo.date ? "x" : item?.orderGo.date}</p>
                            <div className={`borderRadius ${!item?.orderGo.status ? "" : "active"}`} >{item?.orderGo.status && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!item?.orderGo.status ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol">
                            <p>заказ получен</p>
                            <p className="date">{!item?.orderReceived.date ? "x" : item?.orderReceived.date}</p>
                            
                        <div className={`borderRadius ${!item?.orderReceived.status ? "" : "active"}`} >{item?.orderReceived.status && <img src="/tick.svg" alt="галочка"/>}</div>
                        </div>
                    </div>
                </div>
                <button className="writeToShop">написать продавцу</button>
            </div>   
        </div>
    </main>
    
  )
}
