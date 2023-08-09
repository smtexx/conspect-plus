import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../Logo/Logo';
import { BiSolidUserCircle } from 'react-icons/bi';
import { BsIncognito } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveUser } from '../../app/controller/redux/users/usersSlice';

export default function NavBar() {
  const [opened, setOpened] = useState(false);
  const { pathname } = useLocation();
  const user = useSelector(selectActiveUser);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary px-2 py-3 px-lg-3 py-lg-2"
      collapseOnSelect={true}
      expanded={opened}
    >
      <Container>
        <Navbar.Brand as="div">
          <Logo />
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
                className={`nav-link p-0${
                  pathname === '/quicklinks' ? ' active' : ''
                }`}
                to="/"
                onClick={() => setOpened(false)}
              >
                На главную
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link
                className={`nav-link p-0${
                  pathname === '/users' ? ' active' : ''
                }`}
                to="/users"
                onClick={() => setOpened(false)}
              >
                Пользователи
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link
                className={`nav-link p-0${
                  pathname === '/data' ? ' active' : ''
                }`}
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
                  className={`nav-link p-0${
                    pathname.startsWith('/conspect') ? ' active' : ''
                  }`}
                  to="/conspect"
                  onClick={() => setOpened(false)}
                >
                  Конспекты
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link
                  className={`nav-link p-0${
                    pathname.startsWith('/linkset') ? ' active' : ''
                  }`}
                  to="/linkset"
                  onClick={() => setOpened(false)}
                >
                  Ссылки
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link
                  className={`nav-link p-0${
                    pathname.startsWith('/search') ? ' active' : ''
                  }`}
                  to="/search"
                  onClick={() => setOpened(false)}
                >
                  Поиск
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link
                  className={`nav-link p-0${
                    pathname.startsWith('/help') ? ' active' : ''
                  }`}
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
                {user ? (
                  <>
                    <span className="d-flex fs-3 me-2">
                      {<BiSolidUserCircle />}
                    </span>{' '}
                    {user.login}
                  </>
                ) : (
                  <>
                    <span className="d-flex fs-3 me-2 text-secondary">
                      {<BsIncognito />}
                    </span>{' '}
                  </>
                )}
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
