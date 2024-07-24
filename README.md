# STAR WARS CHARACTERS SEARCH
![example workflow](https://github.com/Yuliya-Karuk/ast-star-wars/actions/workflows/cicd.yml/badge.svg) [![Netlify Status](https://api.netlify.com/api/v1/badges/f33a67dc-4b79-47ab-ab5d-863a436788da/deploy-status)](https://app.netlify.com/sites/ast-star-wars/deploys)

- Использованное API: [SWAPI](https://swapi.dev/)
- Деплой: [Deploy](https://ast-star-wars.netlify.app/)

---

## Основной функционал:

 - Регистрация и логин: пользователи могут регистрироваться и входить в приложение.
 - Поиск персонажей: приложение обеспечивает поиск персонажей по ключевым словам.
 - Избранное: пользователи могут добавлять персонажей в избранное и удалять их оттуда со страницы поиска и со страницы персонажа.
 - История поиска: приложение сохраняет историю поисковых запросов.
 - Темы оформления: есть светлая и тёмная тема интерфейса.

---

## 1 уровень (обязательный - необходимый минимум)

- [x] Реализованы Требования к функциональности
- [x] Для хранения учетных записей пользователей, избранного и истории поиска используется Firebase

### React

- [x] Пишем функциональные компоненты c хуками в приоритете над классовыми [Components](https://github.com/Yuliya-Karuk/ast-star-wars/tree/main/src/components), [Pages](https://github.com/Yuliya-Karuk/ast-star-wars/tree/main/src/pages)
- [x] Есть разделение на умные и глупые компоненты: Умные - [HistoryItem](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/components/HistoryItem/HistoryItem.tsx), [CharacterItem](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/components/CharacterItem/CharacterItem.tsx); Глупые - [DetailsInfo](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/components/DetailsInfo/DetailsInfo.tsx), [SuggestionList](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/components/SuggestionList/SuggestionList.tsx)
- [x] Есть рендеринг списков: [CharacterList](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/components/CharacterList/CharacterList.tsx), [History](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/pages/history/history.tsx)
- [x] Реализована хотя бы одна форма: [RegistrationForm](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/pages/registration/registration.tsx)
- [x] Есть применение Контекст API: [ThemeProvider](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/contexts/themeProvider.tsx), [AuthProvider](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/contexts/authProvider.tsx)
- [x] Есть применение предохранителя: [ErrorBoundary](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/components/ErrorBoundary/ErrorBoundary.tsx)
- [x] Есть хотя бы один кастомный хук: [useCharacters](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/hooks/useCharacters.ts), [useFavorites](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/hooks/useFavorites.ts)
- [x] Хотя бы несколько компонентов используют PropTypes: [AuthFormHeader](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/components/AuthFormHeader/AuthFormHeader.tsx), [Pagination](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/components/Pagination/Pagination.tsx)
- [x] Поиск не должен триггерить много запросов к серверу - использование библиотеки (useDebounce): [useDebounce](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/hooks/useSearchForm.ts)
- [x] Есть применение lazy + Suspense: [AppRoutes](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/router/router.tsx)

### Redux

- [x] Используем Modern Redux with Redux Toolkit: [store](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/store/index.ts)
- [x] Используем слайсы: [favoritesSlice](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/store/favoritesSlice.ts), [historySlice](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/store/historySlice.ts)
- [x] Есть хотя бы одна кастомная мидлвара или createListenerMiddleware: [errorNotifyMiddleware](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/store/middlewares/errorNotifyMiddleware.ts), [favoritesMiddleware](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/store/middlewares/favoritesMiddleware.ts)
- [x] Используется RTK Query: [swapiApi](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/store/api/swapiApi.ts)
- [x] Используется Transforming Responses: [swapiApi](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/store/api/swapiApi.ts)

---

## 2 уровень (необязательный)

- [x] Используется [TypeScript](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/models/index.ts)
- [x] Настроен [CI/CD](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/.github/workflows/cicd.yml)
- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем [FireBase](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/firebase/firebase.ts)
- [x] Проведена оптимизация приложения   
Избавилась от функции WaitForAuth [link on commit](https://github.com/Yuliya-Karuk/ast-star-wars/commit/f2819b7c01c1e5df02d5dea34a400df99aa05354#diff-04fd75a84c2de55c63d684a0b6c306f6eac8505f91ea389081f7b33a71904d1d)   
Добавлен UseMemo, чтобы избежать ненужных перерисовок компонентов [link](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/contexts/themeProvider.tsx)   
Убраны useEffect с обработкой ошибки запроса к SWAPI (такой код был в 3-4 файлах)
```
  const { data: characters, error: charactersError } = useGetCharactersByIdsQuery(favorites || []);

  useEffect(() => {
    if (charactersError) {
      errorNotify(`Error fetching characters: ${charactersError}`);
    }
  }, [charactersError, errorNotify]);
```
[ссылка как было](https://github.com/Yuliya-Karuk/ast-star-wars/commit/0d7f86e8510bfd5451e6dd239cd3787809e168c4#diff-beaa3006f346b371dfdd0c3f519ddd61e0d75d7c9a5ad37002268acd672f85a7),  
теперь ошибка обрабытывается errorNotifyMiddleware 
[errorNotifyMiddleware](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/store/middlewares/errorNotifyMiddleware.ts)
- [x] Низкая связанность клиентского кода с хранилищем.   
Работа с Firebase происходит в контексте, и UI компоненты не знаю как это происходит
- [x] Добавлены тесты - unit tests: [CharacterList](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/tests/CharacterList/CharacterList.test.tsx), [Pagination](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/tests/Pagination/Pagination.test.tsx), [Card](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/tests/Card/Card.test.tsx)
- [x] Связь UI и бизнес-логики построена не через команды, а через события - [login](https://github.com/Yuliya-Karuk/ast-star-wars/blob/main/src/pages/login/login.tsx)   
Логика: пользователь нажимает на Submit - и компонент не знает, что происходит по клику - он вызывает функцию из хука useAuthentication => вызывается функция login из useAuth контекста => пользователь логинится на firebase и вызывается dispatch(setUser())


### Дополнительные библиотеки:

- [SASS](https://sass-lang.com/)
- [classnames](https://www.npmjs.com/package/classnames)
- [react-hook-form](https://react-hook-form.com/)
- [react-toastify](https://www.npmjs.com/package/react-toastify)
- Линтеры - [Eslint](https://eslint.org/), [Prettier](https://prettier.io/), [Stylelint](https://stylelint.io/), [Husky](https://typicode.github.io/husky/)

