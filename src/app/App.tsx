import './view/styles/index.scss';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import ErrorPage from './ErrorPage';
import QuickLinks from '../components/QuickLinks/QuickLinks';
import Users from '../components/Users/Users';
import Data from '../components/Data/Data';
import Conspects from '../components/Conspects/Conspects';
import Sections from '../components/Sections/Sections';
import Pages from '../components/Pages/Pages';
import Note from '../components/Note/Note';
import Editor from '../components/Editor/Editor';
import Linksets from '../components/Linksets/Linksets';
import Links from '../components/Links/Links';
import Search from '../components/Search/Search';
import Help from '../components/Help/Help';
import Page404 from '../components/Page404/Page404';
import { Provider } from 'react-redux';
import { store } from './controller/redux/store';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
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
        path: 'edit/:draftID',
        element: <Editor />,
      },
      {
        path: 'linkset',
        element: <Linksets />,
      },
      {
        path: 'linkset/:linksetID',
        element: <Links />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'help',
        element: <Help />,
      },
      { path: '*', element: <Page404 /> },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
