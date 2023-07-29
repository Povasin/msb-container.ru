import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import {BagSlice} from "../store/slices/bag"
import {store} from "../store/slices/store"
import LazyLoad from 'react-lazy-load';

export default function BagCard({card}) {
    const location = useLocation()
    const CardId = location.pathname.split("/")[1]
    const {items: bagItems} = useSelector((state)=>state.BagSlice)
    const handleClick = ()=>{
        console.log(card);
        store.dispatch(BagSlice.actions.removeCard(card));
    }
    const changeProdactCount = (value) =>{
    if (value > 0) {
        const newItems = bagItems.map((item) => item.idCard === card.idCard ? {...item, count: value} : item) 
        store.dispatch(BagSlice.actions.updateBag(newItems));
    }

    }
    const changeProdactMonth = (value) =>{  
        if (value > 0) {
            const newItems = bagItems.map((item) => item.idCard === card.idCard ? {...item, month: value} : item) 
            store.dispatch(BagSlice.actions.updateBag(newItems));
        }
    }   
    const mainCard = card.data.img
    return (
    <div className="bag__block">
        <div className="block__radius">
        <Link className="block__img" to={`/card/${card.idCard}`}><LazyLoad threshold={ 0.20 }><img src={mainCard} alt={card.data.name}/></LazyLoad></Link>
        </div>
        <div className="block__content">
            {CardId == "arrange" ? null : <p className="block__close" onClick={handleClick}>x</p> }
            <p className="rent">Аренда</p>
            <Link to={`/card/${card.idCard}`} className="info">{card.data.name}</Link>
            <div className="block__input">
                <div className="quantity_innerContainer">
                    <div className="quantity_inner">		
                        <p  className="bt_minus"  onClick={()=>changeProdactCount(card.count-1)}>-</p>
                        <label className="fd-col">количество<p className="quantity">{card.count}</p></label>
                        <p className="bt_plus" onClick={()=>changeProdactCount(card.count+1)} >+</p>
                    </div>
                    <div className="quantity_inner">		
                        <p  className="bt_minusMonth"  onClick={()=>changeProdactMonth(card.month-1)}>-</p>
                        <label className="fd-col">месяцев<p className="quantity">{card.month}</p></label>
                        <p  className="bt_plusMonth" onClick={()=>changeProdactMonth(card.month+1)}>+</p>
                    </div>
                </div>
                <div className="block-col">
                    <p className="block__discount"> {card.data.discount != 0 && card?.data.have == 'true' && `${(card.count*card.data.discount)*card.month}`}</p>
                    <p className="block__price" name="priceOrder">{card?.data.have == 'true' ?  `${(card.count*card.data.price)*card.month}₽` : "Нет в наличии"}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
