import React from 'react'
import { useState } from 'react'
import "./css/login.css"
import { useSelector } from 'react-redux'
import {store} from "../shared/store/slices/store"
import {login, authSlice} from "../shared/store/slices/auth"

export default function LoginPage() {

  const [form, setForm ] = useState({
    email: "", 
    password: ""
  })
  
  const authSlice = useSelector((state)=>state.authSlice)
  console.log(authSlice);
  return (
    <main>   
        <div className="login">
            <h1>Вход</h1>
            <div className="login-row">
                <input type="email" placeholder="эл.почта" maxLength="40" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required/>
                <input type="password"  value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} placeholder="пароль" maxLength="16" required/>
                <p className="error">{authSlice.error}</p>
                <button id="login" onClick={()=>store.dispatch(login({body: form}))}>подтвердить</button>
                <p className="account">Нет аккунта? <a href="../register/register.html">Зарегистрируйтесь</a></p>
            </div>
        </div>  
    </main>
  )
}
