import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import { PageNotFound } from "./Pages/PageNotFound";
import { Main } from "./Pages/Main";
import { Album } from "./Pages/Album";
import { Post } from "./Pages/Post";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/album/:id',
        element: <Album />,
      },
      {
        path: '/post/:id',
        element: <Post />,
      },
      {
        path: '*',
        element: <PageNotFound />
      },
    ]
  }
])