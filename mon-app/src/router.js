import User from './components/User';
import UserList from './components/UserList';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <User />,
  },
  {
    path: 'users-list',
    element: <UserList />,
  },
]);
