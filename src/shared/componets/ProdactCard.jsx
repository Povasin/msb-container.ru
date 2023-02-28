import React from 'react'
import {BagSlice} from "../store/slices/bag"
import {store} from "../store/slices/store"
import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';

export default function ProdactCard({item}) {
     const handleClick = ()=>{
        store.dispatch(BagSlice.actions.addCard(item));
     }
     const BagStore = useSelector((state) => state.BagSlice); 
     const isActive = BagStore.items.filter((array)=>array.id == item.id)[0]
    return (
        <div className="card">
            <div className="fd-row">
                <p className="star">{item.star}</p>
                <Link to={`/card/${item.id}`} className="card__arrow">→</Link>
            </div>
            <Link to={`/card/${item.id}`}><img className="card__img" src={item.img[0].src} alt={item.name}/></Link>
            <p className="rent">Аренда</p>
            <Link to={`/card/${item.id}`} className="info">{item.name}</Link>         
            <div className="card__sale">
                <div className="fd-col">
                    <p className="discount">{item.discount}</p>
                    <p className="card__price">От {item.price}₽</p> 
            </div>
                <input type="image" onClick={!isActive ? handleClick : null}  className={`card__bag ${isActive && "card__bagActive"}`} src={isActive ? "/blackBag.svg" : "/bag.svg"} alt={item.name}/>
            </div> 
        </div>
    )
}