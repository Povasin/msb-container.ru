import React from 'react'
import {BagSlice} from "../../store/slices/bag"
import {store} from "../../store/slices/store"
import {useSelector} from "react-redux";
export default function FurnitureCard({item}) {
     const handleClick = ()=>{
        store.dispatch(BagSlice.actions.addCard(item));
     }
     const BagStore = useSelector((state) => state.BagSlice); 
     const isActive = BagStore.items.filter((array)=>array.id == item.id)[0]
    return (
        <div className="card">
            <div className="fd-row">
                <p className="star">{item.star}</p>
                <p className="card__arrow">→</p>
            </div>
            <img className="card__img" src={item.img} alt={item.name}/>
            <p className="rent">Аренда</p>
            <p className="info">{item.name}</p>         
            <div className="card__sale">
                <div className="fd-col">
                    <p className="discount">{item.discount}</p>
                    <p className="card__price">{item.price}₽</p> 
                </div>
                {isActive ? <div className="furniture__CardActive"><p>добавлено</p> <button className="furniture__bagActive">+</button></div>  :   <button onClick={!isActive && handleClick} className="card__bag">+</button> }
                </div> 
        </div>
    )
}