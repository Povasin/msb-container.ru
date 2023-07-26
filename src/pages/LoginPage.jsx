import React from 'react'
import { useState } from 'react'
import "./scss/login.scss"
import { useSelector } from 'react-redux'
import {store} from "../shared/store/slices/store"
import {login, authSlice} from "../shared/store/slices/auth"
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [form, setForm ] = useState({
    email: "", 
    password: ""
  })
  const auth = useSelector((state)=>state.authSlice)
  if (auth.userData && !auth.isLoading  ) {
    navigate(`/user/${auth.userData.id}`)
  }
  useEffect(()=>{
    store.dispatch(authSlice.actions.clearError());
  }, [])
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <main>   
        <div className="loginClient">
           <h1>Вход</h1>
            <div className="login-row">
                <input type="email" placeholder="Эл.почта" maxLength="40" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required/>
                <input type="password"  value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} placeholder="Пароль" maxLength="16" required/>
                <p className="error">{auth.error}</p>
                <button className={`loginBTN ${!auth.isLoading  ? "" : "loading "} `} disabled={auth.isLoading } onClick={()=>store.dispatch(login({body: form}))}>{!auth.isLoading  ? "Подтвердить" : "Загрузка"}</button>
                <p className="account">Нет аккунта? <Link to="/register"> Зарегистрируйтесь</Link></p>
            </div>
        </div>  
    </main>
  )
}
