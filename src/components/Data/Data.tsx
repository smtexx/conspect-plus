import { Card, Button } from 'react-bootstrap';

interface I_DataCard {
  header: string;
  text: string;
  buttonText: string;
  buttonHandler: () => void;
}

const dataCards: I_DataCard[] = [
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
    text: `Вы можете выполнить экспорт данных вашего аккаунта в файл.
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
    text: `Выполняется импорт данных в файл аналогично функции "Экспортировать данные".
    После чего аккаунт пользователя удаляется из приложения. Подходит в случае, если вы
    больше не планируете работать с приложением на данном устройстве.`,
    buttonText: 'Экспорт и Выход',
    buttonHandler: () => {},
  },
];

export default function Data() {
  return (
    <div className="row gy-4">
      {dataCards.map((card, idx) => (
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
      ))}
    </div>
  );
}
