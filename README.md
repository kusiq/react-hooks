# Hooks Catalog

Minimal product catalog on `React + TypeScript + Redux Toolkit + RTK Query + React Router + SCSS + Vite`.

Проект собран как понятный учебный кейс для повышения до middle: маленькая доменная область, строгая структура, объяснимые оптимизации, уместные хуки и минимум “магии”.

## What This Project Demonstrates

- FSD-структуру: `app`, `pages`, `widgets`, `features`, `entities`, `shared`
- Server state через `RTK Query`
- Global UI state через `Redux Toolkit`
- Локальное transient state внутри страниц и виджетов
- Семантическую верстку и минималистичный product UI
- Набор объяснимых оптимизаций без “useMemo/useCallback везде”

## Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit
- RTK Query
- React Router
- SCSS Modules
- Vitest + Testing Library
- ESLint + Prettier
- Husky + lint-staged

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run test:run
npm run format
```

## Project Structure

```text
src
├── app        # providers, router, store
├── pages      # route-level composition
├── widgets    # composed UI blocks
├── features   # user actions and business interactions
├── entities   # product domain, api, model, ui
└── shared     # config, hooks, styles, ui helpers, test helpers
```

## Hooks Used And Why

### React hooks

- `useState`: локальный input state и открытие/закрытие drawer
- `useEffect`: debounce/throttle logic, scroll listeners, escape handling, body scroll lock
- `useMemo`: производные данные списка после deferred search
- `useCallback`: стабильные callbacks для memoized `ProductCard`
- `useDeferredValue`: делает поиск отзывчивым при пересчете списка
- `useTransition`: помечает сортировку и фильтры как non-urgent updates
- `lazy` + `Suspense`: отдельная загрузка страницы избранного и detail drawer

### Custom hooks

- `useDebounce<T>(value, delay)`: задерживает поисковый запрос и не гоняет производные вычисления на каждый символ
- `useThrottle<T>(value, delay)`: ограничивает частоту scroll-driven UI обновлений

### Hooks from `usehooks-ts`

- `useLocalStorage`: хранит избранное между сессиями
- `useMediaQuery`: переключает режим drawer между mobile и desktop
- `useOnClickOutside`: закрывает drawer по клику вне панели

## Key Optimization Choices

- Параллельные запросы `products` и `categories` на одном уровне страницы, без водопада
- Список продуктов хранится в RTK Query cache и повторно используется между страницами
- Поиск не попадает в Redux store на каждый keypress
- Селекторы и утилиты считают производные данные отдельно от JSX
- `ProductCard` мемоизирован, потому что его много и у него дорогой визуальный шаблон
- Вторичная страница и detail drawer грузятся лениво и не раздувают initial bundle
- Константы вынесены в `shared/config`, повторяющаяся логика в `shared/lib`

## Data Flow

1. `CatalogPage` одновременно запрашивает товары и категории.
2. RTK Query складывает ответы в cache.
3. Redux slice хранит текущий category/sort и favorite ids.
4. Page-level selector объединяет cached products + filters + favorites.
5. `useDebounce` и `useDeferredValue` дополнительно сглаживают поиск.
6. `ProductGrid` получает уже готовый список для рендера.

## Testing Strategy

- Unit: `useDebounce`, `useThrottle`, filter/sort utilities, reducers
- Integration: catalog search, category/sort updates, favorite toggle, empty state, error state, drawer open/close

## Why This Is Easy To Explain

- У каждой оптимизации есть понятная проблема, которую она решает
- У каждого хука есть конкретная зона ответственности
- Архитектура маленькая, но “настоящая”: есть store, api cache, routing, persistence, testing, quality gates
- В проекте нет скрытых хелперов, неочевидных абстракций и перегруженных generic-оберток

## Git And Deploy

После установки зависимостей:

```bash
git init -b main
npm run prepare
```

Для деплоя на Vercel:

1. Создай GitHub-репозиторий и запушь проект.
2. Подключи репозиторий в Vercel.
3. Используй preview deploy для веток.

Если `vercel` CLI уже установлен и авторизован, можно деплоить и через него.
