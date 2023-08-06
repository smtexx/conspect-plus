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
import Pages from '../components/Pages/Pages';
import Note from '../components/Note/Note';
import Editor from '../components/Editor/Editor';
import Linkset from '../components/Linkset/Linkset';
import Links from '../components/Links/Links';

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
      {
        path: 'conspect/:conspectID/:sectionID',
        element: <Pages />,
      },
      {
        path: 'conspect/:conspectID/:sectionID/:pageID',
        element: <Note />,
      },
      {
        path: 'edit',
        element: <Editor />,
      },
      {
        path: 'linkset',
        element: <Linkset />,
      },
      {
        path: 'linkset/:linksetID',
        element: <Links />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
