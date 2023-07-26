import React from 'react'
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

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
            <div  className="radius__user">
                <Link className='LinkImg__user'>{item?.img != 'false' ?  
                <LazyLoad className="card__img__user" threshold={ 0.20 }>
                    <img itemprop="contentUrl" src={item?.img} alt={item?.name}/>
                </LazyLoad> :
                    <img  className="img__emptyPhoto" src='/emptyIcon.svg' alt={item?.name}/> 
                }</Link> 
            </div>
            <div className="block__content"> 
                <p className="orderNumber">Закаказ № {item.number}</p>
                <p className='rent'>{item.delivery == "самовызов" ? `можно забрать:` : "срок доставки:"} <span>{item.date == '' && !item.orderReceived ? "не указано продавцом" : item.orderReceived ? "заказ получен" : item.date}</span></p>
                <Link className="track" to={`/user/${auth?.userData.idUser}/${item.number}`}>{!item.orderReceived ? "Отслеживать" : "История" }</Link>
            </div>
        </div>
        )
        }
    </div>
  )
}
