import { Card, Button, Accordion } from 'react-bootstrap';

interface I_DataCard {
  header: string;
  text: string;
  buttonText: string;
  buttonHandler: () => void;
}

const dataActions: I_DataCard[] = [
  {
    header: 'Сохранить изменения',
    text: `Изменения которые вы внесли в Ваши конспекты хронятся
    в памяти браузера, и не сохраняются при закрытии вкладки приложения,
    или закрытии браузера. Для того чтобы они были доступны при следующем
    запуске приложения, нажмите на кнопку ниже.`,
    buttonText: 'Сохранить',
    buttonHandler: () => {},
  },
  {
    header: 'Экспортировать данные',
    text: `Выполнить экспорт данных вашего аккаунта в файл.
    Это позволит вам загрузить данные в приложение, открытое на другом 
    устройстве или в другом браузере. Таким образом вы можете 
    работать с вашими конспектами где вам удобно.`,
    buttonText: 'Экспортировать',
    buttonHandler: () => {},
  },
  {
    header: 'Импортировать данные',
    text: `Выполнить импорт данных из ранее экспортированного файла.
    Данные будут сохранены в браузере для дальнейшей работы с ними. Импорт 
    данных происходит в активный аккаунт, при этом все данные активного
    аккаунта заменяются импортируемыми данными из файла!`,
    buttonText: 'Импортировать',
    buttonHandler: () => {},
  },
  {
    header: 'Экспортировать и выйти',
    text: `Выполнить импорт данных в файл аналогично функции "Экспортировать данные".
    После чего аккаунт пользователя удаляется из приложения. Подходит в случае, если вы
    больше не планируете работать с приложением на данном устройстве.`,
    buttonText: 'Экспортировать и выйти',
    buttonHandler: () => {},
  },
];

export default function Data() {
  return (
    <div className="row gy-4">
      <div className="col-12 ">
        <Card>
          <Card.Header as="h5" className="text-white">
            Менеджмент данных
          </Card.Header>
          <Card.Body className="px-lg-4">
            <Accordion defaultActiveKey="0">
              {dataActions.map((action, idx) => (
                <Accordion.Item eventKey={idx.toString()}>
                  <Accordion.Header>
                    <span className="text-white fw-weight-bold">
                      {action.header}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ maxWidth: '40rem' }}>{action.text}</p>
                    <Button
                      className="mb-4 ms-3"
                      variant="primary"
                      onClick={action.buttonHandler}
                    >
                      {action.buttonText}
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            {/* {dataActions.map((action, idx) => (
              <div key={idx}>
                <Card.Title>{action.header}</Card.Title>
                <Card.Text style={{ maxWidth: '40rem' }}>
                  {action.text}
                </Card.Text>
                <Button
                  className="ms-3 mb-4"
                  variant="warning"
                  onClick={action.buttonHandler}
                >
                  {action.buttonText}
                </Button>
              </div>
            ))} */}
          </Card.Body>
        </Card>
      </div>

      {/* {dataCards.map((card, idx) => (
        <div
          className="col-sm-12 col-lg-6 col-xxl-4 d-flex align-items-stretch"
          key={idx}
        >
          <Card>
            <Card.Header as="h5" className="text-white">
              {card.header}
            </Card.Header>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Text>{card.text}</Card.Text>
              <Button
                variant="light"
                onClick={card.buttonHandler}
                className="align-self-end"
              >
                {card.buttonText}
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))} */}
    </div>
  );
}
