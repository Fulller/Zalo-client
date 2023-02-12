import GlobalStyle from "../GlobalStyle";
import ReactRouter from "../ReactRouter";
import { Provider } from "react-redux";
import store from "../../redux/store";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle>
        <ReactRouter></ReactRouter>
      </GlobalStyle>
    </Provider>
  );
}

export default App;
