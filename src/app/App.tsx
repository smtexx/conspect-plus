import './view/styles/index.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './view/routes/Root';
import ErrorPage from './view/routes/ErrorPage';
import QuickLinks from '../components/QuickLinks/QuickLinks';
import Users from '../components/Users/Users';
import Data from '../components/Data/Data';
import Conspects from '../components/Conspects/Conspects';
import Sections from '../components/Sections/Sections';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'recent',
        element: <QuickLinks />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'data',
        element: <Data />,
      },
      {
        path: 'conspect',
        element: <Conspects />,
      },
      {
        path: 'conspect/:conspectID',
        element: <Sections />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
