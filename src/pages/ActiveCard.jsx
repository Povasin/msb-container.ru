import React, {useEffect, useState} from 'react'
import {cardsSlice, getCards, getCardsImg, addCards} from "../shared/store/slices/cards"
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';
import { Link, useLocation} from 'react-router-dom';
import CardsCard from '../shared/componets/CardsCard';
import "./scss/activeCard.scss"
import LoadingPageAdmin from './LoadingPageAdmin'

export default function ActiveCard() {
  const location = useLocation()
  const cards = useSelector((state)=>state.cardsSlice)
  function reverse(array){
    return array.map((item,idx) => array[array.length-1-idx])
  }
  let newMassReverse = reverse(cards?.items)
  async function MiddleWareCreateCard() {
    await store.dispatch(addCards({}))
  }
  useEffect(()=>{
    store.dispatch(getCards({}))
    store.dispatch(getCardsImg({}))
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
}, [location])
  return (
    <div>
      <div className='headerOrder'>
        <button className='btnForCreate' onClick={()=>MiddleWareCreateCard()} >создать карточку</button> 
        <a href=""></a>
      </div>
      <h1>Добваленные карточки</h1>
      <div className="cards">
        {cards.isLoading ? <LoadingPageAdmin number={3}/> : cards?.items.length != 0 ?  newMassReverse.map((item, index)=><CardsCard key={index} item={item}/>) :  <div className="order__clear">
            <h2>Карточек пока нет</h2>
            <p><Link>создайте карточку</Link> чтобы она появилась здесь</p>
        </div>}
      </div>
    </div>
  )
}
