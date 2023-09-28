import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from './pages/Layout';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import TheragotchiPage from './pages/TheragotchiPage';
import ErrorPage from './pages/ErrorPage';
import Logout from './pages/Logout';
import { TheragotchiProvider } from './utilities/TheragotchiContext';
import "./index.css";
import UserListPage from './pages/UserListPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import QuestionsListPage from './pages/QuestionsListPage';
import QuestionsAddingPage from './pages/QuestionsAddingPage';
import Statistics from './pages/Statistics';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/theragotchiPage",
        element: <TheragotchiPage />,
      },
      {
        path: "/personalStatistics",
        element: <Statistics />,
      },
      {
        path: "/userProfilePage",
        element: <UserProfilePage/>
      },
      {
        path: "/logout",
        element: <Logout/>
      },
      {
        path: "/userListPage",
        element: <UserListPage/>
      },
      {
        path: "/adminUserManagement",
        element: <AdminUserManagementPage/>
      },
      {
        path: "/questionsPage",
        element: <QuestionsListPage/>
      },
      {
        path: "/addQuestion",
        element: <QuestionsAddingPage/>
      }

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TheragotchiProvider>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </TheragotchiProvider>
  </React.StrictMode>
);