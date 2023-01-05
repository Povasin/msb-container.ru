import React from 'react'
import { Link } from 'react-router-dom';

export default function UserBag({auth}) {
    
  return (
    <div>
        {auth.userData?.orderMass == 0 ? 
        <div className="order__clear">
            <h2>заказов пока нет</h2>
            <p>вернитесь на <Link to="/">главную страницу</Link> и закажите что то</p>
        </div> : 
        auth.userData?.orderMass.map((item)=>{return item.mass.map((array)=> 
        <div key={item.number} className="bag__block">
            <div className="block__img"> 
                <img src={array.data.img[0].src} alt={`закаказ № ${item.number}`}/>
            </div>
            <div className="block__content"> 
                <p className="orderNumber">закаказ № {item.number}</p>
                <p className='rent'>{item.delivery == "самовызов" ? `можно забрать:` : "срок доставки:"} <span>{item.date == undefined && !item.orderReceived ? "не указано продавцом" : item.orderReceived ? "заказ получен" : item.date}</span></p>
                <Link className="track" to={`/user/${auth.userData.id}/${item.number}`}>{!item.orderReceived ? "отслеживать заказ" : "история заказа" }</Link>
            </div>
        </div>
        )})
        }
    </div>
  )
}
