import React from 'react'
import { Link } from 'react-router-dom'
import "./css/aboutUs.scss"
export default function AboutUsPage() {
  return (
    <main>   
        <div className="about__wrapper">
            <span><Link to="/">главная </Link>/<Link to="/aboutUs"> о нас</Link></span>      
            <h1>О нас</h1>
            <div className="about">
                <div className="about__content">
                    <p>Предоставляем в аренду строительные бытовки различных модификаций для обустройства временного жилья на объектах в Москве и Московской Области, а также на дачных участках. Работаем с крупными компаниями и физическими лицами. У нас можно взять в аренду бытовку в количестве от 1 единицы на неограниченный срок. Минимальный — 1 месяц.</p>
                    <p>Не завышаем стоимость модулей и блок-контейнеров. Подбираем комплектацию в соответствии с бюджетом заказчика.</p>
                    <div className="fd-row">
                        <Link to="/" className="content__Youtube"><div className="block1"></div></Link>
                        <Link to="/"> <p className="content__text">Наш Youtube канал</p></Link>
                    </div>
                </div>
                <div className="about__block">
                    <img src="/Group.svg" alt="логотип"/>
                </div>
            </div>
            <div className="about">
                <div className="about__blockAbsolute">
                    <img src="/cubinsForLive.webp" alt="бытовки для проживания"/>
                    <img src="/Group.svg" alt="задний фон"/>
                </div>
                <div className="about__content">
                    <h2>бытовки для любых нужд</h2>
                    <p>У нас вы найдёте временные здания для обеспечения жильём строителей на объекте, хранения различных товаров и инвентаря. Каждый блок-контейнер имеет практически универсальное назначение. При необходимости его можно переоборудовать под другие нужды. <br/> Кроме аренды бытовок предоставляем услуги по их доставке, монтажу. Модули доставляются собственными манипуляторами компании, устанавливаются опытными мастерами. На строительные работы распространяется гарантия</p>
                </div>
            </div>
        </div>  
    </main>
  )
}
