#  Конвертер валют

  ![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![PWA](https://img.shields.io/badge/PWA-✓-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
  ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-✓-222222?style=for-the-badge&logo=githubpages&logoColor=white)
  
  <h3>Современный конвертер валют с графиками и темной темой</h3>
  
  [Демо](https://lina-whm.github.io/currency-converter/) • 
  [Репозиторий](https://github.com/lina-whm/currency-converter) • 
    

---

## **Возможности**

|  **Конвертация** | Актуальные курсы 160+ валют |
|  **Графики** | Изменения за неделю и месяц |
|  **Темная тема** | Автоматическое сохранение выбора |
|  **Адаптивность** | Отлично выглядит на всех устройствах |
|  **LocalStorage** | Сохранение последних выбранных валют |
|  **PWA** | Можно установить как приложение |

---

## **Технологии**

  | **Frontend** | React 19, TypeScript, CSS Modules |
  | **Графики** | Recharts |
  | **API** | ExchangeRate-API |
  | **Деплой** | GitHub Pages |
  | **PWA** | Service Worker, Manifest |
  | **API** | ключ получи на exchangerate-api.com (бесплатно) |
---

## **Запуск локально**

```bash
# Клонировать репозиторий
git clone https://github.com/lina-whm/currency-converter.git

# Перейти в папку проекта
cd currency-converter

# Установить зависимости
npm install

# Создать .env файл с API ключом
echo "REACT_APP_EXCHANGE_RATE_API_KEY=ваш_ключ" > .env

# Запустить
npm start