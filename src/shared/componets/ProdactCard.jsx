import React from 'react'
import {BagSlice} from "../store/slices/bag"
import {store} from "../store/slices/store"
import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

export default function ProdactCard({item}) {

     const handleClick = ()=>{
        store.dispatch(BagSlice.actions.addCard(item));
     }
     const BagStore = useSelector((state) => state.BagSlice); 
     const isActive = BagStore.items.filter((array)=>array.idCard == item?.idCard)[0]
    return (
        <div itemscope itemtype="http://schema.org/ImageObject" className="card">
            <div className="fd-row">
                <p className="star">{item?.star}</p>
                <Link to={`/card/${item?.idCard}`} className="card__arrow">→</Link>
            </div>
            <div  className="radius">
                <Link className='LinkImg' to={`/card/${item?.idCard}`}>{item?.img != 'false' ?  
                <LazyLoad className="card__img" threshold={ 0.20 }>
                    <img itemprop="contentUrl" src={item?.img} alt={item?.name}/>
                </LazyLoad> :
                    <img  className="img__emptyPhoto" src='/emptyIcon.svg' alt={item?.name}/> 
                }</Link> 
            </div>
            <p className="rent">Аренда</p>
            <Link to={`/card/${item?.idCard}`} itemprop="name" className="info">{item?.name}</Link>         
            <div className="card__sale">
                <div className="fd-col">
                    <p className="discount">{item?.have == 'true' && item?.discount}</p>
                     <p className="card__price">{item?.have == 'true' ?  `От ${item?.price}₽` : 'Нет в наличии'} </p> 
            </div>
                <img onClick={!isActive ? handleClick : null}  className={`card__bag ${isActive && "card__bagActive"}`} src={isActive ? "/blackBag.svg" : "/bag.svg"} alt={item?.name} />
            </div> 
        </div>
    )
}