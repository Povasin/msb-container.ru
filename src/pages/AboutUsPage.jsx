import React from 'react'
import "./css/aboutUs.css"
export default function AboutUsPage() {
  return (
    <main>   
        <div className="about__wrapper">
            <span><a href="../index.html">главная </a>/<a href="./aboutUs.html"> о нас</a></span>      
            <h1>О нас</h1>
            <div className="about">
                <div className="about__content">
                    <p>Предоставляем в аренду строительные бытовки различных модификаций для обустройства временного жилья на объектах в Москве и Московской Области, а также на дачных участках. Работаем с крупными компаниями и физическими лицами. У нас можно взять в аренду бытовку в количестве от 1 единицы на неограниченный срок. Минимальный — 1 месяц.</p>
                    <p>Не завышаем стоимость модулей и блок-контейнеров. Подбираем комплектацию в соответствии с бюджетом заказчика.</p>
                    <div className="fd-row">
                        <a href="" className="content__Youtube"><div className="block1"></div></a>
                        <a href=""> <p className="content__text">Наш Youtube канал</p></a>
                    </div>
                </div>
                <div className="about__block">
                    <img src="../assets/img/Group.svg" alt="логотип"/>
                </div>
            </div>
            <div className="about">
                <div className="about__blockAbsolute">
                    <img src="../assets/img/cubinsForLive.webp" alt="бытовки для проживания"/>
                    <img src="../assets/img/Group.svg" alt="задний фон"/>
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
