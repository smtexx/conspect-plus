import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTip,
  selectTip,
} from '../../app/controller/redux/data/dataSlice';

export default function TipScreen() {
  const [isShown, setIsShown] = useState(true);
  const tip = useSelector(selectTip);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      changeTip({
        html: 'Нажмите на символ "?" внутри фрагмента с кодом, чтобы вывести справочную информацию.',
      })
    );
  }, [dispatch]);

  function handlePageScroll() {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (scrollHeight - scrolled - viewportHeight <= 10) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handlePageScroll);

    return () => {
      window.removeEventListener('scroll', handlePageScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: '10',
      }}
    >
      <div className="container">
        <div className="row">
          <Alert variant="light" show={isShown} className="mb-0">
            <p
              style={{
                height: 'calc(10rem - 10vw)',
                minHeight: '4rem',
                overflowY: 'auto',
              }}
              dangerouslySetInnerHTML={{ __html: tip }}
            ></p>
          </Alert>
        </div>
      </div>
    </div>
  );
}
