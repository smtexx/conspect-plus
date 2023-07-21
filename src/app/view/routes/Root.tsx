import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';

export default function Root() {
  return (
    <div className="container vh-100 d-flex flex-column">
      <div className="row">
        <NavBar />
      </div>
      <div className="row flex-grow-1">
        <div className="col">
          <main></main>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Footer />
        </div>
      </div>
    </div>
  );
}
