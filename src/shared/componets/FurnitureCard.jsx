import React from 'react'
import {BagSlice} from "../store/slices/bag"
import {store} from "../store/slices/store"
import {useSelector, } from "react-redux";
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
export default function FurnitureCard({item}) {

    const handleClick = ()=>{
    store.dispatch(BagSlice.actions.addCard(item));
    }
    const BagStore = useSelector((state) => state.BagSlice); 
    const isActive = BagStore.items.filter((array)=>array.idCard == item.idCard)[0]

    return (
        <div className="card">
            <div className="fd-row">
                <p className="star">{item.star}</p>
                <Link to={`/card/${item.idCard}`} className="card__arrow">→</Link>
            </div>
            <Link  to={`/card/${item.idCard}`}><LazyLoad  className="card__img" threshold={ 0.20 }><img  src={item.img} alt={item.name}/></LazyLoad></Link>
            <p className="rent">Аренда</p>
            <Link to={`/card/${item.idCard}`} className="info">{item.name}</Link>         
            <div className="card__sale">
                <div className="fd-col">
                    <p className="discount">{item?.have == 'true' && item?.discount}</p>
                    <p className="card__price">{item?.have == 'true' ?  `${item?.price}₽` : 'Нет в наличии'}</p> 
                </div>
                {isActive ? <div className="furniture__CardActive"><p>добавлено</p> <button className="furniture__bagActive">+</button></div>  :   <button onClick={!isActive && handleClick} className="card__bag">+</button> }
                </div> 
        </div>
    )
}