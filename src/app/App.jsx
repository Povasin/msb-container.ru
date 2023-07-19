import { Provider } from "react-redux";
import { store } from "../shared/store/slices/store";
import AppRouter from "./providers/router/AppRouter";
export default function App() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://msb-container.ru/sw.js', {scope: '.'})
    .then((reg) => {
      // регистрация сработала
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
      // регистрация прошла неудачно
      console.log('Registration failed with ' + error);
    });
  }
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter/>
      </div>
    </Provider>
  );
}

