import React from 'react'
import {BagSlice} from "../../store/slices/bag"
import {store} from "../../store/slices/store"
import {useSelector} from "react-redux";
export default function ProdactCard({item}) {
     const handleClick = ()=>{
        store.dispatch(BagSlice.actions.addCard(item));
     }
     const BagStore = useSelector((state) => state.BagSlice); 
     const isActive = BagStore.items.filter((array)=>array.id == item.id)[0]
     console.log(isActive);
     console.log(BagStore);
    return (
        <div class="card">
            <div class="fd-row">
                <p class="star">{item.star}</p>
                <p data-id={item.name} class="card__arrow">→</p>
            </div>
            <img class="card__img" data-id={item.name} src={item.img} alt={item.name}/>
            <p class="rent">Аренда</p>
            <p data-id={item.name} class="info">{item.name}</p>         
            <div class="card__sale">
                <div class="fd-col">
                    <p class="discount">{item.discount}</p>
                    <p class="card__price">От {item.price}₽</p> 
            </div>
                <input type="image" onClick={!isActive && handleClick}  className={`card__bag ${isActive && "card__bagActive"}`} data-id={item.name} src={isActive ? "/bag.svg" : "/bag.svg"} alt={item.name}/>
            </div> 
        </div>
    )
}