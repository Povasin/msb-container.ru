import React from 'react'
import {BagSlice} from "../../store/slices/bag"
import {store} from "../../store/slices/store"
export default function BagCard({item}) {
    const handleClick = ()=>{
        store.dispatch(BagSlice.actions.removeCard(item));
     }
  return (
    <div class="bag__block">
        <img src={item.img} class="block__img"alt={item.name}/>
        <div class="block__content">
            <p class="block__close" onClick={handleClick}>x</p>
            <p class="rent">Аренда</p>
            <p class="info">{item.name}</p>
            <div class="block__input">
                <div class="quantity_inner">		
                    <p  class="bt_minus">-</p>
                    <label class="fd-col">количество<p class="quantity">{item.inputkol}</p></label>
                    <p class="bt_plus" >+</p>
                </div>
                <div class="quantity_inner">		
                    <p  class="bt_minusMonth">-</p>
                    <label class="fd-col">месяцев<p class="quantity">{item.inputMonth}</p></label>
                    <p  class="bt_plusMonth">+</p>
                </div>
                <div class="block-col">
                    <p class="block__discount">{(item.inputkol*item.discount)*item.inputMonth}</p>
                    <p class="block__price" name="priceOrder">{(item.inputkol*item.price)*item.inputMonth }₽</p>
                </div>
            </div>
        </div>
    </div>
  )
}
