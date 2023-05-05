import React, {useEffect, useState} from 'react'
import {cardsSlice, getCards, getCardsImg} from "../shared/store/slices/cards"
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';
import { Link } from 'react-router-dom';
import CardsCard from '../shared/componets/CardsCard';
import "./scss/activeCard.scss"

export default function ActiveCard() {

  const cards = useSelector((state)=>state.cardsSlice)
  const [orderFilter, setOrderFilter] = useState("Добваленные")

  useEffect(()=>{
    store.dispatch(getCards({}))
    store.dispatch(getCardsImg({}))
  }, [])
  return (
    <div>
      <div className='headerOrder'>
        <Link to="/admin/createCard" >создать карточку</Link> 
        <a href=""></a>
      </div>
      <h1>Добваленные карточки</h1>
      <div className="cards">
        { cards?.items.length != 0 ?  cards?.items.map((item, index)=><CardsCard key={index} item={item}/>) :  <div className="order__clear">
            <h2>Карточек пока нет</h2>
            <p><Link to="/createCard" >создайте карточку</Link> чтобы она появилась здесь</p>
        </div>}
      </div>
    </div>
  )
}
