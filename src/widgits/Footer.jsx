import React from 'react'
import "./css/footer/footer.css"
export default function Footer() {
  return (
    <footer>
    <div class="pd-100">
        <div class="answer">
            <h2>Часто задаваемые воросы</h2>
            <div class="answer__block">
                <div class="answer__question">
                    <div class="answer__info">i</div>
                    <p>бытовка автономная?</p>
                    <p class="answer__open">{">"}</p>
                </div>
                <div class="answer__content">Нет, нужно будет подключать воду, электричество и канализацию</div>
            </div>
        </div>
        <div class="answer">
            <div class="answer__block">
                <div class="answer__question">
                    <div class="answer__info">i</div>
                    <p>Какое состояние у бытовок?</p>
                    <p class="answer__open">{">"}</p>
                </div>
                <div class="answer__content">Бытовки б/у, все в хорошем состояние, чистые, убранные и без посторонних запахов. По запросу перед отправкой можем отправить фото бытовки которая приедет именно к вам.</div>
            </div>
        </div>
        <div class="answer">
            <div class="answer__block">
                <div class="answer__question">
                    <div class="answer__info">i</div>
                    <p>Какое состояние у бытовок?</p>
                    <p class="answer__open">{">"}</p>
                </div>
                <div class="answer__content">Бытовки б/у, все в хорошем состояние, чистые, убранные и без посторонних запахов. По запросу перед отправкой можем отправить фото бытовки которая приедет именно к вам.</div>
            </div>
        </div>
        <div class="answer">
            <div class="answer__block">
                <div class="answer__question">
                    <div class="answer__info">i</div>
                    <p>Какое состояние у бытовок?</p>
                    <p class="answer__open">{">"}</p>
                </div>
                <div class="answer__content">Бытовки б/у, все в хорошем состояние, чистые, убранные и без посторонних запахов. По запросу перед отправкой можем отправить фото бытовки которая приедет именно к вам.</div>
            </div>
        </div>
    </div>
    <div class="basement">
        <div class="basement__block">
            <div class="basement__col">
                <h2>Новинки, акции и скидки! <br/> для постояных клиентов</h2>
                <p>мы сами не любим спам, поэтому только самое интересное!</p>
            </div>
            <div class="basement__col">
                <h3>Кстати нас уже 1249 человек!</h3>
                <div class="logFooter">
                    <a href="../login/login.html" class="login">Войти</a>
                    <a href="../register/register.html" class="register">Зарегистрироваться</a>
                </div>
                <h3>Присоединяйся!</h3>
            </div>
        </div>
        <div class="basement__content">
            <div class="d-col">
                <a href="../index.html" class="basement__logo">MSB <span>container</span></a>
                <div class="block">
                    <a href="#" class="prava">2022 все права защищены</a>
                    <a href="#" class="prava">пользовательское соглашение</a>
                    <a href="#" class="prava">политика конфидециальности</a>
                </div>
            </div>
            <div class="d-col">
                <h4>Каталог</h4>
                <a href="./katalog/katalog.html">Бытовки для проживания</a>
                <a href="./katalog/katalog.html">Бытовки раздевалки</a>
                <a href="./katalog/katalog.html">Бытовки прорабские</a>
                <a href="./katalog/katalog.html">Бытовки под склад</a>
                <a href="./katalog/katalog.html">Бытовки с душем</a>
            </div>
            <div class="d-col">
                <h4>Информация</h4>
                <a href="../aboutUs/aboutUs.html">О нас</a>
                <a href="../contact/contact.html">контакты</a>
                <a href="../services/services.html">услуги</a>
                <a href="../gallary/gallary.html">галерея</a>
            </div>
            <div class="d-col">
                <h4>Контакты</h4>
                <p>+7 (910)973-36-65</p>
                <p>	dir@ids76.ru</p>
                <p>г. ярославль, ул 2-я Тарная 2</p>
            </div>
        </div>
    </div>
</footer>
  )
}
