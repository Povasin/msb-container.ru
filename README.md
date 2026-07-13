# 🏗️ MSB Container — Коммерческий сервис аренды бытовок

![Status: Production](https://img.shields.io/badge/Status-Production-brightgreen.svg?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Styling-CC6699.svg?style=for-the-badge&logo=sass&logoColor=white)

**MSB Container** — это действующий коммерческий fullstack-проект (SPA + REST API), разработанный для реального заказчика. Сервис специализируется на аренде и продаже строительных бытовок, интегрирован с локальным гео-поиском и выступает основным каналом привлечения клиентов.

🌐 **Сайт в продакшене:** [msb-container.ru](https://msb-container.ru/)  
🎨 **Макет в Figma:** [Посмотреть дизайн](https://www.figma.com/community/file/1568366712440798399/msb-container)

---

## 📊 Бизнес-показатели и статус
* **Продакшен:** Приложение успешно развернуто и бесперебойно работает на хостинге **Netangels**.
* **Трафик:** Проект обслуживает **~1300 активных пользователей** ежемесячно, стабильно генерируя лиды и прибыль для компании.
* **Интеграция:** Компания и сайт официально представлены и получают органический трафик с **Яндекс Карт**.

---

## ⚙️ Стек технологий
* **Frontend:** React, Redux Toolkit (стейт-менеджмент корзины и данных), React Router v6, SCSS (с адаптивной и кроссбраузерной версткой).
* **Backend:** Node.js, Express (REST API каталога и обработки заказов).
* **База данных:** MySQL.

---

## 🚀 Архитектура и структура
Проект разделен на независимые клиентскую и серверную части. Frontend-архитектура частично опирается на методологию Feature-Sliced Design (FSD):

```text
msb-container/
├── backend/                  # Серверная часть (Node.js / Express API, БД)
│   ├── app.js                # Конфигурация приложения
│   └── index.js              # Точка входа сервера
├── public/                   # Статические файлы и PWA-иконки
├── src/                      # Исходный код React-клиента
│   ├── app/                  # Корневой роутинг (AppRouter) и инициализация
│   ├── assets/               # Локальные ассеты (шрифты Furore, Inter, графика)
│   ├── pages/                # Страницы (Main, Katalog, Bag, Admin Pages)
│   ├── shared/               # Переиспользуемый код (Redux Store, UI-компоненты карточек)
│   └── widgets/              # Крупные UI-модули (Header, Footer, SideBar)
└── build/                    # Готовая оптимизированная production-сборка
