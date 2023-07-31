import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function TipScreen() {
  const [isShown, setIsShown] = useState(true);

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

  const tip = `
    А тут параграф с разными видами текстового содержимого. 
    Например текст выделенный <strong class="cm-marker-bold">Жирный текст</strong>, 
    или текст написаный <em class="cm-marker-italic">курсивом</em>, 
    ну и конечно <mark class="cm-marker-marked">маркированный текст</mark>. 
    Как то так. А вот и текстовая ссылка <a class="cm-marker-link" target="_blank" 
    rel="noopener noreferrer" href="https://ya.ru">Яндекс</a>`.trim();

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
