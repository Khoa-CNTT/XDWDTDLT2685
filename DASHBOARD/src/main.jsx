import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./reducers/index.js";

const store = createStore(allReducers);
Modal.setAppElement("#root");
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);
