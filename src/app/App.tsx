import './view/styles/index.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './view/routes/Root';
import ErrorPage from './view/routes/ErrorPage';
import QuickLinks from '../components/QuickLinks/QuickLinks';
import { loadRecentLinks } from './controller/loadRecentLinks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'recent',
        loader: loadRecentLinks,
        element: <QuickLinks />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
