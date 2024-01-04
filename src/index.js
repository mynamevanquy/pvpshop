import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './error-page';
import Login from './component/Login';
import Contact from './component/Contacts';
import Home from './component/Home';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import authReducer from './redux/reducers/authReducer';
import thunk from 'redux-thunk';
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/",
        element: <Home />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
const store =createStore(authReducer, applyMiddleware(thunk))
axios.defaults.baseURL='https://localhost:443/api'
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
