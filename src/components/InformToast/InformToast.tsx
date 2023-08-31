import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  selectMessage,
  setMessage,
} from '../../app/controller/redux/app/appSlice';
import { Toast } from 'react-bootstrap';
import s from './InformToast.module.scss';

export default function InformToast() {
  const [isShown, setIsShown] = useState(false);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message !== null) {
      setIsShown(true);
    }
  }, [message]);

  function handleClose() {
    setIsShown(false);
    setTimeout(() => dispatch(setMessage(null)), 200);
  }

  return (
    <div className={s.wrapper}>
      <Toast
        className={`d-inline-block m-1 border ${
          message?.type === 'primary'
            ? 'border-warning'
            : 'border-danger'
        }`}
        onClose={handleClose}
        show={isShown}
        bg="dark"
      >
        <Toast.Header
          className={`border-bottom ${
            message?.type === 'primary'
              ? 'text-warning border-warning-subtle'
              : 'text-white border-danger bg-danger'
          }`}
          closeVariant="dark"
        >
          <strong className="me-auto fs-6">Сообщение</strong>
          {new Date().toLocaleTimeString()}
        </Toast.Header>
        <Toast.Body className="fs-6">{message?.text}</Toast.Body>
      </Toast>
    </div>
  );
}
