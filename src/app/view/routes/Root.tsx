import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';
import { useEffect } from 'react';
import { getFakeUsers } from '../../../fakeData/getFakeUsers';

export default function Root() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { users } = getFakeUsers();

  useEffect(() => {
    const isLoggedIn =
      users.findIndex((user) => user.isActive) !== -1 ? true : false;

    if (isLoggedIn && pathname === '/') {
      navigate('/recent#notes');
    } else if (!isLoggedIn && users.length !== 0) {
      navigate('/user');
    } else if (users.length === 0) {
      navigate('/user/create');
    }
  }, [pathname, users, navigate]);

  return (
    <div className="container vh-100 d-flex flex-column">
      <div className="row mb-4">
        <NavBar />
      </div>
      <main className="flex-grow-1 mb-4">
        <Outlet />
      </main>
      <div className="row">
        <div className="col">
          <Footer />
        </div>
      </div>
    </div>
  );
}
