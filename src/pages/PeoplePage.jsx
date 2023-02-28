import React, {useEffect, useState} from 'react'
import "./scss/peoplePage.scss"
import { Link } from 'react-router-dom';
import {peopleSlice, getPeople } from "../shared/store/slices/people"
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';
import PeopleCard from '../shared/componets/PeopleCard';

export default function PeoplePage() {
    const people =   useSelector((state)=>state.peopleSlice)
    const [peopleFilter, setPeopleFilter] = useState("all")
    useEffect(()=>{
        store.dispatch(getPeople({}))
    }, [])
  return (
    <div>
        <div className='headerOrder'>
            <Link to="/admin/createPeople" >добавить сотрудника</Link>
            <a onClick={()=>setPeopleFilter("Администратор")} >администраторы</a>
            <a onClick={()=>setPeopleFilter("Менеджер")} >менеджеры</a>
            <a onClick={()=>setPeopleFilter("all")} className='headerOrder__margin'>все сотрудники</a>
        </div>
        <h1>Сотрудники</h1>
        <div className="people">
            {peopleFilter != "Менеджер" && <>
            <h2>Администраторы</h2>
            <div className="people__order">
                { people?.items.find(item=>item.role == "Администратор") != undefined  ?  people?.items.map((item, index)=>item.role == "Администратор" && <PeopleCard key={index} item={item}/>) :  <div className="order__clear">
                    <h2>Администраторов пока нет</h2>
                    <p><Link to="/createPeople" >добавьте сотрудника</Link> чтобы он появился здесь</p>
                </div>}
            </div>
            </> }
           {peopleFilter != "Администратор" && <>
           <h2>Менеджеры</h2>
            <div className="people__order">
                {people?.items.find(item=>item.role == "Менеджер") != undefined  &&  peopleFilter != "Администратор" ?  people?.items.map((item, index)=>item.role == "Менеджер" && <PeopleCard key={index} item={item}/>) :  <div className="order__clear">
                    <h2>Менеджеров пока нет</h2>
                    <p><Link to="/createPeople" >добавьте сотрудника</Link> чтобы он появился здесь</p>
                </div>}
            </div>
           </>} 
        </div>
    </div>
  )
}
