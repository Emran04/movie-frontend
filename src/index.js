import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import Profile from './routes/profile';
import HomePage from './components/HomePage';
import Login from './components/Login';
import MovieDetails from './components/MovieDetails';
import ImportMovie from './components/ImportMovie';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth-context'
import SignUp from './components/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetails />,
      },
      {
        path: "/import-movie",
        element: <ImportMovie />,
      },
      {
        path: "/customer-login",
        element: <Login />,
      },
      {
        path: "/customer-register",
        element: <SignUp />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
