import React from 'react'

export default function UserPage() {
  return (
    <main>   
        <div className="userHtml">
            <div className="userContent">
                <div className="userContent__photo"></div>
                <div className="userContent__col">
                    <p className="userContent__name"></p>
                    <p>Номер телефона: <span className="userContent__phone"></span></p>
                    <p>Email: <span className="userContent__email"></span></p>
                        <button className="exit">выйти</button>
                </div>
            </div>
            <div className="orders">
                <h1>Заказы</h1>
                <div id="orders__render">
                </div>
            </div>
        </div>  
    </main>
  )
}
