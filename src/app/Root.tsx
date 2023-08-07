import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import { getFakeUsers } from '../fakeData/getFakeUsers';

export default function Root() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { users } = getFakeUsers();

  useEffect(() => {
    const isLoggedIn =
      users.findIndex((user) => user.isActive) !== -1 ? true : false;

    if (isLoggedIn && pathname === '/') {
      navigate('/quicklinks');
    } else if (!isLoggedIn && users.length !== 0) {
      navigate('/users');
    }
  }, [pathname, users, navigate]);

  return (
    <div className="container min-vh-100 d-flex flex-column">
      <div className="row mb-4">
        <NavBar />
      </div>
      <main className="row flex-grow-1 mb-4 ">
        <div className="col-12 d-flex">
          <Outlet />
        </div>
      </main>
      <div className="row">
        <div className="col">
          <Footer />
        </div>
      </div>
    </div>
  );
}
