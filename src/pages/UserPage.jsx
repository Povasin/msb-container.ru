import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { authSlice, getOrder } from '../shared/store/slices/auth';
import { store } from '../shared/store/slices/store';
import "./css/user.scss"
import UserBag from "../shared/componets/userBag/index"
import { useEffect } from 'react';
export default function UserPage() {
    let navigate = useNavigate()
    async function exit() {
        return new Promise((resolve, reject) => {
            resolve(store.dispatch(authSlice.actions.exit()))
        }).then(()=>{navigate("/")})
    }
    const auth = useSelector((state)=>state.authSlice)
    useEffect(()=>{
        auth.userData?.email && store.dispatch(getOrder({email:auth.userData.email}))
    }, [auth.userData?.email])
  return (
    <main>   
        <div className="userHtml">
            <div className="userContent">
                <div className="userContent__photo"></div>
                <div className="userContent__col">
                    <p className="userContent__name">{auth.userData?.name}</p>
                    <p>Номер телефона: <span className="userContent__phone">{auth.userData?.phone}</span></p>
                    <p>Email: <span className="userContent__email">{auth.userData?.email}</span></p>
                        <button className="exit" onClick={exit}>выйти</button>
                </div>
            </div>
            <div className="orders">
                <h1>Заказы</h1>
                <div id="orders__render">
                    {<UserBag auth={auth}/>}
                </div>
            </div>
        </div>  
    </main>
  )
}
