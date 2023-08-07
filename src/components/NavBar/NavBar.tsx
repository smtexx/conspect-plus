import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../Logo/Logo';
import { BiSolidUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar() {
  const [opened, setOpened] = useState(false);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary px-2 py-3 px-lg-3 py-lg-2"
      collapseOnSelect={true}
      expanded={opened}
    >
      <Container>
        <Navbar.Brand as="div">
          <Link to="/" className="text-decoration-none">
            <Logo />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setOpened(!opened)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto pt-3 pt-lg-0">
            <div className="border-top border-2 mb-3 "></div>
            <Nav.Link as="div">
              <Link
                className="nav-link p-0"
                to="/"
                onClick={() => setOpened(false)}
              >
                На главную
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link
                className="nav-link p-0"
                to="/users"
                onClick={() => setOpened(false)}
              >
                Пользователи
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link
                className="nav-link p-0"
                to="/data"
                onClick={() => setOpened(false)}
              >
                Данные
              </Link>
            </Nav.Link>
            <NavDropdown
              title="Мои записи"
              id="conspects-nav-dropdown"
            >
              <NavDropdown.Item as={'div'}>
                <Link
                  className="nav-link p-0"
                  to="/conspect"
                  onClick={() => setOpened(false)}
                >
                  Конспекты
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link
                  className="nav-link p-0"
                  to="/linkset"
                  onClick={() => setOpened(false)}
                >
                  Ссылки
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link
                  className="nav-link p-0"
                  to="/search"
                  onClick={() => setOpened(false)}
                >
                  Поиск
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link
                  className="nav-link p-0"
                  to="/help"
                  onClick={() => setOpened(false)}
                >
                  Инструкция
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <div className="border-top border-2 my-3 my-lg-0"></div>
            <Nav.Link as="div">
              <Link
                to="/users"
                className="d-flex align-items-center ms-lg-5 text-white text-decoration-none"
                aria-label="Активный пользователь"
                onClick={() => setOpened(false)}
              >
                <span className="d-flex fs-3 me-2">
                  <BiSolidUserCircle />
                </span>{' '}
                Роман
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
