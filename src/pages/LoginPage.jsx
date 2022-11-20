import React from 'react'
import "./css/login.css"
export default function LoginPage() {
  return (
    <main>   
        <div className="login">
            <h1>Вход</h1>
            <div className="login-row">
                <input type="email"id="email"placeholder="эл.почта" maxlength="40" required/>
                <input type="password" id="password" placeholder="пароль" maxlength="16" required/>
                <p className="error"></p>
                <button id="login">подтвердить</button>
                <p className="account">Нет аккунта? <a href="../register/register.html">Зарегистрируйтесь</a></p>
            </div>
        </div>  
    </main>
  )
}
