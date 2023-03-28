import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate, useLocation, Link,} from 'react-router-dom'
import {cardsSlice, getCards} from "../shared/store/slices/cards"
import { orderSliceClient, getOrdersCards, changeOrderCard, getordersAdmin, getOrdersAuth} from '../shared/store/slices/orderClient';
import { store } from '../shared/store/slices/store';
import "./scss/OrdersPageNumber.scss"

export default function  OrderCardPage() {
    const isLoading = useSelector((state)=>state.orderSliceClient.isLoading)
    const orderStorage = JSON.parse(localStorage.getItem("order"))
    const orders = useSelector((state)=>state.orderSliceClient)
    const location = useLocation()
    const [user, setUser] = useState(orderStorage.find((item)=>item.idUser == location.pathname.split("/")[3] && item.number == location.pathname.split("/")[4])) 
    const [orderDateForDelivery, setOrderDateForDelivery] = useState("")
    const [isChanged, setIsChanged] = useState(false)
    const cards = useSelector((state)=>state.cardsSlice)
    function cardsConnectFunc() {
        let cardsConnect = []
        orders?.orderCards.map(item=>{
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
    function changeItem(key) {
        let date = new Date() 
        setIsChanged(true)
        setUser({...user, date: orderDateForDelivery, [key]:  `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${date.getMonth()+1 < 10 ?  `0${date.getMonth()+1}` : date.getMonth()+1}.${date.getFullYear()}`})
    }
    console.log(orderDateForDelivery);
    console.log(user);
    useEffect (()=>{
        store.dispatch(getordersAdmin({}))
        store.dispatch(getCards({}))
        store.dispatch(getOrdersAuth({idUser: user?.idUser}))
        store.dispatch(getOrdersCards({idUser: user?.idUser, number:  user?.number}))
    }, [])
  return (
    <div>
        <div className='userHtmlAdmin'>
            <h1>заказ №{user?.number}</h1>
            <div className="order">
            {isCards.map((array, index)=>
            <div key={index} className="bag__block">
                 <Link to={`/card/${array.idCard}`}><img  src={array.data?.img} alt={array.data?.name}/></Link>  
                <div className="block__content">
                <p className="rent">Аренда</p>
                <Link className="OrderName"  to={`/card/${array.data?.idCard}`}>{array.data?.name}</Link>
                    <div className="block__inputRow">	
                        <div className="block__input">	
                            <p className="fd-col">количество: <span>{array.count}шт</span></p>		
                            <p className="fd-col">срок Аренды: <span>{array.month}мес</span></p>
                        </div>
                        <div className="block-col">
                            <p className="block__discount">{(array.count*array.data?.discount)*array.month}</p>
                            <p className="block__price" name="priceOrder">{(array.count*array.data?.price)*array.month}₽</p>
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
                <span>{user?.delivery == "самовызов" ? user?.delivery : `г. ${user?.delivery.split('/')[0]} ул. ${user?.delivery.split('/')[1]} `}</span>
            </div>
            <div className="input__date">
                <p>Дата для {user?.delivery == "самовызов" ?  "самовызова" : "доставки"}: </p>
                <input type="text" onChange={(e)=>setOrderDateForDelivery(e.target.value)} placeholder="Например 20.01.23" value={user.date}/>
            </div>
            <h2>Информация о заказчике</h2>
            <div className="input__delivery">
                <p>Имя:</p>
                <span>{orders.auth.name}</span>
            </div>
            <div className="input__delivery">
                <p>email:</p>
                <span>{orders.auth.email}</span>
            </div>
            <div className="input__delivery">
                <p>Номер телефона:</p>
                <span>{orders.auth.phone}</span>
            </div>
            <h2>Отслеживание заказа</h2>
                <div className="orders__track">
                    <div className="orders__trackInfo">
                        <div className="orders__trackInfoCol">
                            <p>заказ принят</p>
                            <p className="date">{!user?.orderAccepted ? "x" : user?.orderAccepted}</p>
                            <div className={`borderRadius ${!user?.orderAccepted ? "" : "active"}`} onClick={()=>changeItem("orderAccepted")}>{user?.orderAccepted && <img src="/tick.svg" alt="галочка"/>}</div>
                        <div className={`border ${!user?.orderAccepted ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol">
                            <p>заказ собирается</p>
                            <p className="date">{!user?.orderCollect ? "x" : user?.orderCollect}</p>
                            <div className={`borderRadius ${!user?.orderCollect ? "" : "active"}`} onClick={()=>changeItem("orderCollect")}>{user?.orderCollect && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!user?.orderCollect ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol1">
                            <p>заказ в пути</p>
                            <p className="date">{!user?.orderGo ? "x" : user?.orderGo}</p>
                            <div className={`borderRadius ${!user?.orderGo ? "" : "active"}`} onClick={()=>changeItem("orderGo")}>{user?.orderGo && <img src="/tick.svg" alt="галочка"/>}</div>
                            <div className={`border ${!user?.orderGo ? "" : "borderActive"}`}></div>
                        </div>
                        <div className="orders__trackInfoCol">
                            <p>заказ получен</p>
                            <p className="date">{!user?.orderReceived ? "x" : user?.orderReceived}</p>   
                            <div className={`borderRadius ${!user?.orderReceived ? "" : "active"}`} onClick={()=>changeItem("orderReceived")}>{user?.orderReceived && <img src="/tick.svg" alt="галочка"/>}</div>
                        </div>
                    </div>
                </div>
            </div>   
            <div className="chatAndChange">
                <button className="writeToShop">написать покупателю</button>
                <button className={`change ${isLoading && "loading"}`} disabled={isLoading} onClick={()=>store.dispatch(changeOrderCard({body: user})) }>{!isChanged && !isLoading ? "сохраненно" :  !isLoading ? "сохранить" : "загрузка"}</button>
            </div>
        </div>
    </div>
    
  )
}
