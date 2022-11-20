import React from 'react'
import "./css/contact.css"
export default function ContactPage() {
  return (
    <main>   
        <div className="map">
            <h1>Контакты</h1>
            <div className="map__contact">
                <div className="map-col">
                    <h2>Телефон</h2>
                    <p>+7 (910)973-36-65</p>
                </div>
                <div className="map-col">
                    <h2>Адрес</h2>
                    <p>г. ярославль, ул 2-я Тарная 2</p>
                </div>
                <div className="map-col">
                    <h2>Электронная почта</h2>
                    <p>dir@ids76.ru</p>
                </div>
            </div>
            <div id="map__yandex">
                <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A975b459ad04e6f23bdc600c9da5bb050f132b186bfdc0cb84237e85aeda192e0&amp;width=100%25&amp;height=350&amp;lang=ru_RU&amp;scroll=true"></script>
            </div>
        </div>
    </main>
  )
}
