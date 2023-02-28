import React from 'react'
import { useState } from 'react'
import "./scss/loginAdmin.scss"
import { useSelector } from 'react-redux'
import {store} from "../shared/store/slices/store"
import {loginAdmin, authSlice} from "../shared/store/slices/auth"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function LoginPageAdmin() {
  const navigate = useNavigate()
  const [form, setForm ] = useState({
    email: "", 
    password: ""
  })
  let user = JSON.parse(localStorage.getItem("user"))
  const auth = useSelector((state)=>state.authSlice)
  if (user) {
    if (user.role && !auth?.isLoading  ) {
      navigate(`/admin/order`)
    }
  }
  useEffect(()=>{
    store.dispatch(authSlice.actions.clearError());
  }, [])
  useEffect(()=>{
    if (user) {
      if (user.role !== undefined) {
        navigate(`/admin/order`)
      }
    }
  }, [])
  return (
    <main>  
        <div className="logo">
            <img alt="логотип"  src="/iconPWA/logo144x144.svg"/>
            <a href="https://msb-container.ru/">MSB<span>container</span></a>
        </div> 
        <div className="login">
            <h1>Вход</h1>
            <div className="login-row">
                <input type="email" placeholder="эл.почта" maxLength="40" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required/>
                <input type="password"  value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} placeholder="пароль" maxLength="16" required/>
                <p className="error">{auth?.error}</p>
                <button className={`loginBTN ${!auth?.isLoading  ? "" : "loading "} `} disabled={auth?.isLoading } onClick={()=>store.dispatch(loginAdmin({body: form}))}>{!auth?.isLoading  ? "подтвердить" : "загрузка"}</button>
            </div>
        </div>  
    </main>
  )
}
