import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom';

export default function OrdersCard({item, orderFilter}) {
  return (
    <>  
      <div className="bag__block">
            <img src={item.img} alt={`закаказ № ${item.number}`}/>
            <div className="block__content"> 
            {!item.orderCollect && !item.orderAccepted && !item.orderGo && !item.orderReceived ? <p className="block__orderNew">новый</p> : item.orderCollect && item.orderAccepted && item.orderGo && item.orderReceived ? <p className="block__orderTrack">доставлено</p> : <p className="block__orderAccept">активен</p>}
                <p className="orderNumber">закаказ № {item.number}</p>
                <p className='rent'>Cпособ отправки: <span>{item.delivery == "самовызов" ? `самовызов:` : "доставка"}</span></p>
                <Link className="track" to={`/admin/order/${item.idUser}/${item.number}`}>{!item.orderReceived ? "отслеживать заказ" : "история заказа" }</Link>
            </div>
      </div>
    </>
  )
}
