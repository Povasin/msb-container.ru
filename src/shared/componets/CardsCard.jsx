import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom';
export default function CardsCard({item}) {
  return (
    <>     
      <div className="bag__block">
     {item.img != 'false' ? 
      <img  className="card__img" src={item.img} alt={item.name}/> 
      :
      <div className="img__empty">
         <img  className="img__emptyPhoto" src='/emptyIcon.svg' alt={item.name}/> 
      </div>
     } 
            <div className="block__content"> 
                <p className="orderNumber">{item.name}</p>
                <p className='rent'>Категория: <span>{item.role}</span></p>
                <Link className="track" to={`/admin/cards/${item.idCard}`}>посмотреть информацию</Link>
            </div>
      </div>
    </>
  )
}
