import React from 'react'
import { Link } from 'react-router-dom';

export default function UserBag({order, auth}) {
  return (
    <div>
        {order?.items.length == 0 ? 
        <div className="order__clear">
            <h2>заказов пока нет</h2>
            <p>вернитесь на <Link to="/">главную страницу</Link> и закажите что то</p>
        </div> : 
        order?.items.map((item)=>
        <div key={item.number} className="bag__block">
            <div className="block__img"> 
                <img src={item.img} alt={`закаказ № ${item.number}`}/>
            </div>
            <div className="block__content"> 
                <p className="orderNumber">закаказ № {item.number}</p>
                <p className='rent'>{item.delivery == "самовызов" ? `можно забрать:` : "срок доставки:"} <span>{item.date == '' && !item.orderReceived ? "не указано продавцом" : item.orderReceived ? "заказ получен" : item.date}</span></p>
                <Link className="track" to={`/user/${auth?.userData.idUser}/${item.number}`}>{!item.orderReceived ? "отслеживать заказ" : "история заказа" }</Link>
            </div>
        </div>
        )
        }
    </div>
  )
}
