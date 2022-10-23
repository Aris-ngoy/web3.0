import React, { FC } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import AdminPage from './pages/Admin/Admin';
import HomePage from './pages/Dashboard/Home';
import DashboardPage from './pages/Dashboard/Index';
import ErrorPage from './pages/error-page';
import LoginPage from './pages/Login/LoginPage';

import { RecoilRoot } from 'recoil'
import TransactionProvider from './context/TransactionProvider';
import ProductPage from './pages/Dashboard/product';
import TransactionsPage from './pages/Dashboard/Transactions';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

const App : FC = () =>{
  return(
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <TransactionProvider>
          <RouterProvider router={router} />
        </TransactionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App