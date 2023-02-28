import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom';

export default function OrdersCard({item, orderFilter}) {
  const [orderFilterMass, setOrderFilterMass] = useState([])

  useEffect(()=>{
    orderFilter == "Все" && setOrderFilterMass(item.orderMass)
    orderFilter == "Новые" && setOrderFilterMass(item.orderMass.filter((card)=>!card.orderCollect.status && !card.orderAccepted.status && !card.orderGo.status && !card.orderReceived.status))
    orderFilter == "Активные" && setOrderFilterMass(item.orderMass.filter((card)=>card.orderCollect.status || card.orderAccepted.status || card.orderGo.status || card.orderReceived.status))
    orderFilter == "Доставленные" && setOrderFilterMass(item.orderMass.filter((card)=>card.orderCollect.status && card.orderAccepted.status && card.orderGo.status && card.orderReceived.status))
  }, [orderFilter])
  return (
    <>
      {orderFilterMass.length == 0 ? <div className="order__clear">
        <h2>{orderFilter == "new" ? "Новых заказов пока нет" : orderFilter == "active" ? "Активных" : orderFilter == "old" && "Доставленных" } заказов пока нет</h2>
        <p>для обнавление заказов перезагрузите сайт</p> 
      </div> : orderFilterMass.map((card)=>        
      <div className="bag__block">
            <img src={card.mass[0].data.img[0].src} alt={`закаказ № ${card.number}`}/>
            <div className="block__content"> 
            {!card.orderCollect.status && !card.orderAccepted.status && !card.orderGo.status && !card.orderReceived.status ? <p className="block__orderNew">новый</p> : card.orderCollect.status && card.orderAccepted.status && card.orderGo.status && card.orderReceived.status ? <p className="block__orderTrack">доставлено</p> : <p className="block__orderAccept">активен</p>}
                <p className="orderNumber">закаказ № {card.number}</p>
                <p className='rent'>Cпособ отправки: <span>{card.delivery == "самовызов" ? `самовызов:` : "доставка"}</span></p>
                <Link className="track" to={`/order/${item._id}/${card.number}`}>{!card.orderReceived.status ? "отслеживать заказ" : "история заказа" }</Link>
            </div>
      </div>)}
    </>
  )
}
