import React, {useRef, useState} from 'react'
import {useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import "./scss/arrange.scss"
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { authSlice } from '../shared/store/slices/auth';
import {store} from "../shared/store/slices/store"
import {order, BagSlice} from "../shared/store/slices/bag"
import BagCard from '../shared/componets/BagCard'

export default function ArrangePage() {
    const [ isDelivery, setIsDelivery] = useState(false)
    const navigate = useNavigate()
    const BagStore = useSelector((state) => state.BagSlice); 
    const auth = useSelector((state)=>state.authSlice)
    const loading = BagStore.isLoading 
    let newBagMass = BagStore.items.filter(item=>item.data.have == 'true')
    const [inputDelivery, setInputDelivery] = useState({
        city: "",
        house: ""
    })
    const [error, setError] = useState("")
    function BagStorePrice() {
        let summ = 0;
        newBagMass.forEach(item=>{
            summ+= (item.count*item.data.price )*item.month 
        })
        return summ
    }
    function BagStoredisCount() {
        let summ = 0;
        newBagMass.forEach(item=>{
            if (((item.count*item.data.price )*item.month)-((item.count*item.data.discount )*item.month)  < 0) {
                summ+= ((item.count*item.data.price )*item.month)-((item.count*item.data.discount )*item.month)
            }
        })
        return summ
    }
 
    async function  send() {
        if (!isDelivery) {
            await store.dispatch(order({body:{ mass: newBagMass, delivery: "самовызов"}, idUser: auth.userData.idUser}))
        } else{
            if (inputDelivery.city == "" || inputDelivery.house == "") {
                setError("поля не заполненны")
            } else{
                console.log(auth.userData.idUser);
                await store.dispatch(order({body:{ mass: newBagMass, delivery: inputDelivery}, idUser: auth.userData.idUser}))
            }
        }
    }
    if (auth.userData && !loading  && newBagMass == 0) {
        navigate(`/user/${auth.userData.idUser}`)
      }

  return (
    <main>
        <div className="arrange__wrapper">
            {document.documentElement.clientWidth > 630 &&  <span><Link to="/">главная </Link>/<Link to="/arrange"> Оформление заказа</Link></span> } 
            <h1>Способ получения</h1>
            <div className='delivery__wrapper'>
                <button className={`delivery ${!isDelivery ? "active" : ""}`} onClick={()=>setIsDelivery(false)}>Cамовызов</button>
                <button className={`delivery ${isDelivery ? "active" : ""}`} onClick={()=>setIsDelivery(true)} >Доставкa</button>
            </div>
            {!isDelivery ? 
            <>  
                <h2>Самовызов</h2>
                <div className='map1'>
                {document.documentElement.clientWidth > 630 && <div className="map__contact">
                        <div className="map-col">
                            <h2>Телефон</h2>
                            <p>+7 (910)973-36-65</p>
                        </div>
                        <div className="map-col">
                            <h2>Адрес</h2>
                            <p>г. ярославль, ул 2-я Тарная 2</p>
                        </div>
                        <div className="map-col">
                            <h2>Электронная почта</h2>
                            <p>dir@ids76.ru</p>
                        </div>
                    </div>}
                    <div id="map__yandex">
                    <YMaps>
                        <Map width="100%" height="100%" defaultState={{ center: [57.60083313280139,39.890269973791455], zoom: 18   }} > 
                            <Placemark geometry={[57.60083313280139,39.890269973791455]}  properties={{iconCaption: "msb-container",  balloonContent: '<strong>blue</strong> color'}} options={ {preset: 'islands#violetCircleDotIconWithCaption'}  }  />
                        </Map>
                    </YMaps>
                    </div>
                </div>
            </>
        : 
            <div className='delivery__input'>
                 <h2>Адрес доставки</h2>
                <input type="addres" placeholder='Город' value={inputDelivery.city} onChange={(e)=>setInputDelivery({...inputDelivery, city: e.target.value})} />
                <input type="addres" placeholder='Улица / Дом' value={inputDelivery.house} onChange={(e)=>setInputDelivery({...inputDelivery, house: e.target.value})}/>
            </div>
            }
            <h2>Заказ</h2>
            {newBagMass.map((item, index) => <BagCard key={index} card={item}/>)}
            <h2>Оплата</h2>
            <div className="input__price">
                    <p>Итого:</p>
                    <span name="summPriceOrder" id="price">{BagStorePrice()}₽</span>
            </div>                    
            <div className="input__discount">
                <p>Скидка:</p>
                <span id="discount">{BagStoredisCount()}</span>
            </div>
            <div className="input__delivery">
                <p>Cпособ доставки:</p>
                <span id="discount">{!isDelivery ? "Самовызов" : `Доставка`}</span>
            </div>
            <p className='error'>{error}</p>
            <button className={`order ${loading ? "loading" : ""}`} onClick={send} disabled={loading}>{loading ? "Загрузка" : "Оформить заказ"}</button>
        </div>
        {document.documentElement.clientWidth < 630 && <div className="mobile__bag">
            <p>{BagStorePrice()}₽</p>
            <p>{BagStoredisCount()}</p>
            <button className={`order ${loading ? "loading" : ""}`} onClick={send} disabled={loading}>{loading ? "Загрузка" : "Оформить заказ"}</button>
        </div>}
    </main>
  )
}
