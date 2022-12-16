import React from 'react'
import { useSelector } from 'react-redux'
import {BagSlice} from "../../store/slices/bag"
import {store} from "../../store/slices/store"

export default function BagCard({card}) {

    const {items: bagItems} = useSelector((state)=>state.BagSlice)
    const handleClick = ()=>{
        store.dispatch(BagSlice.actions.removeCard(card));
    }
    const changeProdactCount = (value) =>{
        let newProdact = bagItems.find(item => item.id == card.id)
        const newItems = [...bagItems.filter((item) => item.id !== card.id), {...newProdact, count: value}] 
        store.dispatch(BagSlice.actions.updateBag(newItems));
    }
    const changeProdactMonth = (value) =>{  
        let newProdact = bagItems.find(item => item.id == card.id)
        const newItems = [...bagItems.filter((item) => item.id !== card.id), {...newProdact, month: value}] 
        store.dispatch(BagSlice.actions.updateBag(newItems));
    }   
    const cardImg = card.data.img ? card.data.img[0].src : null
    return (
    <div className="bag__block">
        <img src={cardImg} className="block__img"alt={card.data.name}/>
        <div className="block__content">
            <p className="block__close" onClick={handleClick}>x</p>
            <p className="rent">Аренда</p>
            <p className="info">{card.data.name}</p>
            <div className="block__input">
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
                <div className="block-col">
                    <p className="block__discount">{(card.count*card.data.discount)*card.month}₽</p>
                    <p className="block__price" name="priceOrder">{(card.count*card.data.price)*card.month }₽</p>
                </div>
            </div>
        </div>
    </div>
  )
}
