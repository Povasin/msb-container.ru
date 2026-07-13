# 🏗️ MSB Container — Коммерческий сервис аренды бытовок

![Status: Production](https://img.shields.io/badge/Status-Live-brightgreen.svg?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg?style=for-the-badge&logo=react)
![Redux](https://img.shields.io/badge/State-Redux_Toolkit-764ABC.svg?style=for-the-badge&logo=redux)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1.svg?style=for-the-badge&logo=mysql)

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
* **Design:** Figma-based implementation
* **База данных:** MySQL.

---

## Архитектура и структура
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
```
## 💡 Почему этот проект важен
Этот проект подтверждает опыт работы с реальными бизнес-задачами:
1. **Дизайн-интеграция:** Полное соответствие макетам Figma
2. **Бизнес-результат:** Сайт реально работает и приносит прибыль компании
3. **SEO и присутствие:** Проект прошел этап индексации и присутствует на Яндекс.Картах

## 🚀 Основные возможности
- **Каталог товаров:** Динамическая загрузка бытовок из базы данных.
- **Корзина (Bag):** Управление состоянием заказа через Redux
- **Admin Panel:** Управление контентом и заказами (интегрировано в архитектуру проекта)
- **Analytics:** Постоянный мониторинг пользовательской активности (1200+ MAU)
