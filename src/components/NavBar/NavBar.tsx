import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../Logo/Logo';
import { BiSolidUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

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
            <Nav.Link>
              <Link className="nav-link p-0" to="/">
                На главную
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link p-0" to="/users">
                Пользователи
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link p-0" to="/data">
                Данные
              </Link>
            </Nav.Link>
            <NavDropdown
              title="Мои записи"
              id="conspects-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link className="nav-link p-0" to="/conspect">
                  Конспекты
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="nav-link p-0" to="/resource">
                  Ресурсы
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="nav-link p-0" to="/draft">
                  Черновики
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link className="nav-link p-0" to="/conspect/create">
                  Создать конспект
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="nav-link p-0" to="/resource/create">
                  Создать ресурс
                </Link>
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
