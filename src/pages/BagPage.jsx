import React from 'react'
import {useSelector} from "react-redux";
import BagCard from '../shared/componets/bagCard'
import "./css/bag.css"
export default function BagPage() {
    const BagStore = useSelector((state) => state.BagSlice); 
  return (
    <main>   
        <div className="bag__wrapper">
            <span><a href="../index.html">главная </a>/<a href="./bag.html"> корзина</a></span>      
            <h1>Корзина товаров</h1>
            <div  className="bag">
                <div className="bag__items">
                {BagStore.items.map((item, index) => <BagCard key={index} item={item}/>)}
                </div>
                <div className="bag__price">
                    <div className="bag__promoCode">
                        <input type="text" placeholder="Промокод" className="promocode"/>
                        <div id="acceptPromocode">Ok</div>
                    </div>
                    <p className="accept"></p>
                    <div className="input__price">
                        <p>Итого</p>
                        <span name="summPriceOrder" id="price">0</span>
                    </div>                    
                    <div className="input__discount">
                        <p>Без скидки</p>
                        <span id="discount">0</span>
                    </div>
                    <label className="delivery"><input type="checkbox" className="input__checkboxAdress" required/>доставкa: <span id="delivery">договорная</span></label>
                    <input type="text" name="adress" id="adress" placeholder="укажите адресс" required/>
                    <label className="self-call"><input type="checkbox" name="input__checkboxMap" className="input__checkboxMap" required/>самовызов: <span id="self-call">0</span></label>
                    <p id="error"></p>
                    <button id="order">Оформить заказ</button>
                </div>
            </div>
        </div>  
    </main>
  )
}
