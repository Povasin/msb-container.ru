import React, {useRef} from 'react'
import {useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import BagCard from '../shared/componets/BagCard'
import { authSlice } from '../shared/store/slices/auth';
import {store} from "../shared/store/slices/store"
import {order, BagSlice} from "../shared/store/slices/bag"
import "./scss/bag.scss"
import { useState } from 'react';
export default function BagPage() {
    const BagStore = useSelector((state) => state.BagSlice); 
    const auth = useSelector((state)=>state.authSlice)
    const [checkAuth, setCheckAuth] = useState("")
    const navigate = useNavigate()
    let newBagMass = BagStore.items.filter(item=>item.data.have == 'true')
    console.log(BagStore.items);
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
            summ+= (item.count*item.data.discount )*item.month 
        })
        return summ
    }
    
    function send() {
        if (BagStore.items == 0) {
            setCheckAuth("ваша корзина пока пуста вернитесь на главную страницу и заполните ее")
        } else {
            if (!auth.userData) {
                setCheckAuth(" ПОДСКАЗКА: Для оформления заказа зарегистрируйтесь")
            } else {
                if (BagStoredisCount() == 0) {
                    setCheckAuth(" ПОДСКАЗКА: Товары которых нет в наличии нельзя заказать")
                } else{
                    navigate(`/arrange`)}
                }
            } 
    }
    return ( 
        <main>   
            <div className="bag__wrapper">
                <span><Link to="/">главная </Link>/<Link to="/bag"> корзина</Link></span>      
                <h1>Корзина товаров</h1>
                <div  className="bag">
                    <div className={`bag__items ${BagStore.items == 0 ? "clear" : ""}`}>
                    {BagStore.items == 0 ? <div className="bag__clear"><h2>ваша корзина пока пуста</h2><p>вернитесь на <Link to="/">главную страницу</Link> и заполните ее</p></div> : BagStore.items.map((item, index) => <BagCard key={index} card={item}/>)}
                    </div>
                    {BagStore.items != 0 &&  <div className="bag__price">
                        <div className="bag__promoCode">
                            <input type="text" placeholder="Промокод" className="promocode"/>
                            <div id="acceptPromocode">Ok</div>
                        </div>
                        <p className="accept"></p>
                        <div className="input__price">
                            <p>Итого</p>
                            <span name="summPriceOrder" id="price">{BagStorePrice()}₽</span>
                        </div>                    
                        <div className="input__discount">
                            <p>Без скидки</p>
                            <span id="discount">{BagStoredisCount()}₽</span>
                        </div>
                        <p id="error">{checkAuth}{BagStore.error}</p>
                        <button id="order" to="/arrange" onClick={send}>к оформлению</button>
                    </div>}  
                </div>
            </div>  
        </main>
  )
}