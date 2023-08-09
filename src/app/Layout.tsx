import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectActiveUser } from './controller/redux/users/usersSlice';

export default function Layout() {
  // Redirect to /users if not logged in
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector(selectActiveUser);

  useEffect(() => {
    if (user && pathname === '/') {
      navigate('/quicklinks');
    } else if (!user) {
      navigate('/users');
    }
  }, [pathname, user, navigate]);

  return (
    <div className="container min-vh-100 d-flex flex-column">
      <header className="row mb-4">
        <NavBar />
      </header>
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
