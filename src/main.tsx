import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' 
//
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "rc-slider/assets/index.css";
// STYLE
import "./assets/styles/index.css"
import "./assets/styles/index.scss"
import "./assets/fonts/line-awesome-1.3.0/css/line-awesome.css"
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <App/>
);
