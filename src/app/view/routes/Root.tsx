import { Outlet } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';

export default function Root() {
  return (
    <div className="container vh-100 d-flex flex-column">
      <div className="row mb-4">
        <NavBar />
      </div>
      <main className="row flex-grow-1 mb-4 px-3 px-lg-0">
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
