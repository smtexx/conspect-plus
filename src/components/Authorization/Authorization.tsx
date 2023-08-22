import { useEffect } from 'react';
import {
  getUserData,
  getUsers,
} from '../../app/controller/localstorage';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadUsers,
  selectActiveUser,
} from '../../app/controller/redux/users/usersSlice';
import { loadData } from '../../app/controller/redux/data/dataSlice';
import { useLocation, useNavigate } from 'react-router-dom';

interface I_Props {
  children: React.ReactNode;
}

export default function Authorization({ children }: I_Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const users = getUsers();
      const activeUser = users.find((u) => u.isActive);
      const userData = activeUser && getUserData(activeUser.login);

      if (users.length > 0) {
        dispatch(loadUsers(users));
      }
      if (userData) {
        dispatch(loadData(userData));
      }

      if (activeUser === undefined) {
        navigate('/users');
      }
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeUser = useSelector(selectActiveUser);
  const { pathname } = useLocation();
  useEffect(() => {
    if (activeUser === undefined && pathname !== '/users') {
      navigate('/users');
    }
  }, [pathname, activeUser, navigate]);

  return <>{children}</>;
}
