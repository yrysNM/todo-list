import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/App/AppAPI";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    // <App />
    <React.Fragment>
    <div>
        Hello World
    </div>
    </React.Fragment>
);