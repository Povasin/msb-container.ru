import { Provider } from "react-redux";
import { store } from "../shared/store/slices/store";
import AppRouter from "./providers/router/AppRouter";
export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter/>
      </div>
    </Provider>
  );
}

