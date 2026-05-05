# 💱 Currency Converter - React PWA Application

[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescriptlang.org)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-green)](https://recharts.org)
[![PWA](https://img.shields.io/badge/PWA-✅-yellow)](https://web.dev/progressive-web-apps/)
[![API](https://img.shields.io/badge/API-ExchangeRate--API-orange)](https://www.exchangerate-api.com/)
[![Responsive](https://img.shields.io/badge/Responsive-✅-green)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

Современное PWA-приложение для конвертации валют с **реальными курсами**, интерактивными графиками и темной темой. Полностью на русском языке

##  Ключевые особенности

-  Реальные курсы валют через ExchangeRate-API
-  Умные графики - сегодняшняя точка = реальный курс, остальные дни = реалистичные колебания
-  Темная тема с автоматическим сохранением выбора в localStorage
-  PWA (Progressive Web App) - можно установить на телефон как нативное приложение
-  Автосохранение последних выбранных валют
-  Полная поддержка русского языка (интерфейс, даты, подписи)
-  Адаптивный дизайн - идеально на всех устройствах

##  Демо

### [Посмотреть демо на GitHub Pages](https://lina-whm.github.io/currency-converter/)

## Демонстрация работы

![Демо конвертера валют](public/demo.gif)

**Скриншоты:**

| Светлая тема | Темная тема | Мобильная версия |
|--------------|------------|------------------|
| ![Light Theme](/public/screenshots/light.png) | ![Dark Theme](/public/screenshots/dark.png) | ![Mobile](/public/screenshots/mobile.png) |

##  Технологический стек

### Frontend
- **React 19** - современные хуки, функциональные компоненты
- **TypeScript** - строгая типизация, интерфейсы
- **Recharts** - красивые и отзывчивые графики
- **CSS Modules** - изолированные стили без конфликтов
- **Context API** - глобальное управление темой
- **LocalStorage** - сохранение пользовательских настроек

### API и данные
- **ExchangeRate-API** - реальные курсы валют
- **Собственный алгоритм** - генерация реалистичных исторических данных на основе текущего курса

### Инфраструктура
- **PWA** - manifest.json, service worker, установка на устройства
- **GitHub Pages** - автоматический деплой
- **Jest + Testing Library** - unit-тестирование компонентов

## Как работают графики

| Компонент | Что показывает |
|-----------|----------------|
| **Ось X** | Даты (ДД.ММ.ГГГГ) |
| **Ось Y** | Курс в целевой валюте (например, рубли за 1 доллар) |
| **Сегодня** |  **Реальный курс из API** |
| **Прошлые дни** |  Реалистичные колебания вокруг реального курса |
| **Тултип** | При наведении показывает дату и полную информацию на русском |

## Быстрый старт

### Требования
- Node.js 18+
- npm или yarn
- API ключ от [ExchangeRate-API](https://www.exchangerate-api.com/) (бесплатно)

### Установка

```bash
# клонировать репозиторий
git clone https://github.com/lina-whm/currency-converter.git
cd currency-converter

# установить зависимости
npm install

# запустить проект
npm start
