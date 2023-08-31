import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import Authorization from '../components/Authorization/Authorization';
import InformToast from '../components/InformToast/InformToast';

export default function Layout() {
  return (
    <Authorization>
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
      <InformToast />
    </Authorization>
  );
}
