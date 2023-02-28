import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom';

export default function CardsCard({item}) {
  return (
    <>     
      <div className="bag__block">
            <img src={item.img} alt={item.name}/>
            <div className="block__content"> 
                <p className="orderNumber">{item.name}</p>
                <p className='rent'>Категория: <span>{item.role}</span></p>
                <Link className="track" to={`/cards/${item.id}`}>посмотреть информацию</Link>
            </div>
      </div>
    </>
  )
}
