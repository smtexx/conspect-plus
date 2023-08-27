import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import Authorization from '../components/Authorization/Authorization';
import MessageModal from '../components/MessageModal/MessageModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMessage,
  setMessage,
} from './controller/redux/app/appSlice';

export default function Layout() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  const handleCloseMessageModal = () => {
    dispatch(setMessage(null));
  };

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
      <MessageModal
        open={message !== null}
        type={message?.type || 'primary'}
        title="Сообщение"
        modalText={message?.text || ''}
        buttonText="Закрыть"
        buttonHandler={handleCloseMessageModal}
        onHide={handleCloseMessageModal}
      />
    </Authorization>
  );
}
