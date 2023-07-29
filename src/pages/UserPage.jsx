import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { authSlice} from '../shared/store/slices/auth';
import { orderSliceClient, getorder} from '../shared/store/slices/orderClient';
import { store } from '../shared/store/slices/store';
import "./scss/user.scss"
import UserBag from "../shared/componets/UserBag"
import LoadingPage from './LoadingPageAdmin'

export default function UserPage() {
    let navigate = useNavigate()
    function exit() {
        store.dispatch(authSlice.actions.exit())
        navigate("/")
    }
    const auth = useSelector((state)=>state.authSlice)
    const order = useSelector((state)=>state.orderSliceClient)
    useEffect(()=>{
        order?.items && auth.userData?.idUser && store.dispatch(getorder({idUser: auth.userData?.idUser}))
    }, [auth.userData?.idUser])
  return (
    <main>   
        <div className="userHtml">
            <div className="userContent">
                <div className="userContent__photo"><img src="/userIcon.svg" alt="пользователь" /></div>
                <div className="userContent__col">
                {document.documentElement.clientWidth > 630 && <p className="userContent__name">{auth.userData?.name}</p>}
                    <p>  {document.documentElement.clientWidth > 630 && 'Email:'} <span className="userContent__email">{auth.userData?.email}</span></p>
                    <p>  {document.documentElement.clientWidth > 630 && 'Номер телефона:' }<span className="userContent__phone">{auth.userData?.phone}</span></p>
                    {document.documentElement.clientWidth > 730 &&  <button className="exit" onClick={exit}>Выйти</button> }
                </div>
            </div>
            <div className="orders">
            {document.documentElement.clientWidth < 730 &&  <button className="exit" onClick={exit}>Выйти</button> }
                <h1>Заказы</h1>
                <div id="orders__render">
                {order.isLoading ? <LoadingPage number={3}/> :  <UserBag order={order} auth={auth}/>}
                </div>
            </div>
        </div>  
    </main>
  )
}
