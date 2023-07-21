import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../Logo/Logo';
import { BiSolidUserCircle } from 'react-icons/bi';

export default function NavBar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary px-2 py-3 px-lg-3 py-lg-2"
      collapseOnSelect={true}
    >
      <Container>
        <Navbar.Brand href="#home">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto pt-3 pt-lg-0">
            <div className="border-top border-2 mb-3 "></div>
            <Nav.Link href="#home">На главную</Nav.Link>
            <NavDropdown title="Мои записки" id="notes-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Конспекты
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Ресурсы
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Черновики
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Создать конспект
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Создать ресурс
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Пользователи" id="users-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Новый пользователь
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                Сменить пользователя
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Данные" id="data-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Импорт данных
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                Экспорт данных
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                Экспорт данных и очистка
              </NavDropdown.Item>
            </NavDropdown>
            <div className="border-top border-2 my-3 my-lg-0"></div>
            <Navbar.Text>
              <p className="d-flex align-items-center mb-0 ms-lg-5 text-light">
                <span className="d-flex fs-2 me-3">
                  <BiSolidUserCircle />
                </span>{' '}
                Роман
              </p>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
