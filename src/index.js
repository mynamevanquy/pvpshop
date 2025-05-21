import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './redux/reducers/authReducer';

import axios from 'axios';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Pages / Routes
import Root from './routes/Root';
import ErrorPage from './error-page';
import Home from './component/Home';
import Contact from './component/Contacts';
import About from './component/About';
import InforAccount from './component/InforAccount';
import Login from './component/Login';
import ForgotPasswordPage from './component/ForgotPasswordPage';
import ResetPasswordPage from './component/ResetPasswordPage';

// Cấu hình axios
axios.defaults.baseURL = 'http://localhost:8080/api';

// Cấu hình redux store
const store = createStore(authReducer, applyMiddleware(thunk));

// Router setup
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'contact', element: <Contact /> },
      { path: 'about', element: <About /> },
      { path: 'infor', element: <InforAccount /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
