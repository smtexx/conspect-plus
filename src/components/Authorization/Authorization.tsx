import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveUser } from '../../app/controller/redux/users/usersSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/controller/redux/store';
import { readAppState } from '../../app/controller/redux/app/appSlice';

interface I_Props {
  children: React.ReactNode;
}

export default function Authorization({ children }: I_Props) {
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(readAppState());

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
