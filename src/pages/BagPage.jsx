import React, {useRef} from 'react'
import {useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import BagCard from '../shared/componets/BagCard'
import { authSlice } from '../shared/store/slices/auth';
import {store} from "../shared/store/slices/store"
import {order, BagSlice, checkRegister} from "../shared/store/slices/bag"
import "./scss/bag.scss"
import ProductCard from "../shared/componets/ProdactCard"
import { useState } from 'react';
export default function BagPage() {
    const cards = useSelector((state)=>state.cardsSlice)
    const BagStore = useSelector((state) => state.BagSlice); 
    const auth = useSelector((state)=>state.authSlice)
    const navigate = useNavigate()
    let newBagMass = BagStore.items.filter(item=>item.data.have == 'true')
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
    function send() {
        if (!auth.userData) {
            store.dispatch(BagSlice.actions.checkRegister(" ПОДСКАЗКА: Для оформления заказа зарегистрируйтесь"));
        } else {
            if (BagStoredisCount() == 0) {
                store.dispatch(BagSlice.actions.checkRegister(" ПОДСКАЗКА: Товары которых нет в наличии нельзя заказать"));
            } else{
                navigate(`/arrange`)
            }
        }
    }
    return ( 
        <main>   
            <div className="bag__wrapper">
            {document.documentElement.clientWidth > 630 && <>
                <span><Link to="/">главная </Link>/<Link to="/bag"> корзина</Link></span>      
                <h1>Корзина товаров</h1>
            </> }
                <div  className="bag">
                    <div className={`bag__items ${BagStore.items == 0 ? "clear" : ""}`}>
                    {BagStore.items == 0 ? <div className="bag__clear"><h2>ваша корзина пока пуста</h2><p>вернитесь на <Link to="/">главную страницу</Link> и заполните ее</p></div> : BagStore.items.map((item, index) => <BagCard key={index} card={item}/>)}
                    </div>
                    {BagStore.items != 0 &&  <div className="bag__price">
                    {document.documentElement.clientWidth < 630 && <div className="line"></div>}
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
                            <p>Cкидка</p>
                            <span id="discount">{BagStoredisCount()}</span>
                        </div>
                        <p id="error">{BagStore.error}</p>
                        <button id="order" to="/arrange" onClick={send}>К оформлению</button>
                    </div>}  
                </div>
            </div>  
            {document.documentElement.clientWidth < 630 && BagStore.items != 0 ?
            <div className="mobile__katalog">
                <h2>Лидеры продаж</h2>
                <div className="mobile__katalogContainer">
                    {cards?.items.map((item, index)=>index < 6 && <ProductCard key={index} item={item}/>)}
                </div>
                <Link to="/katalog" className="more">Посмотреть все бытовки</Link>
            </div>
         : false} 
        </main>
  )
}