import Global from "../Global";
import ReactRouter from "../ReactRouter";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Module from "../../layouts/Module";

function App() {
  return (
    <Provider store={store}>
      <Global>
        <ReactRouter></ReactRouter>
      </Global>
    </Provider>
  );
}

export default App;
