import { Alert, Button } from 'react-bootstrap';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 mt-5">
          <Alert show={true} variant="danger">
            <Alert.Heading>Ошибка.</Alert.Heading>
            <p>
              Во время работы приложения произошла непредвиденная
              ошибка. Нам жаль что так вышло, мы попытаемся это
              исправить. Вы можете попробовать перезагрузить
              приложение, нажав кнопку ниже.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button variant="outline-danger" href="/">
                Перезагрузить
              </Button>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
}
