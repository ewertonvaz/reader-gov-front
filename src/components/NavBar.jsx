import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import logo from '../assets/logo.png'


function NavBar() {

  const { loggedInUser } = useContext(AuthContext);

  return (

    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" >
      <Container>
        <Navbar.Brand href="/">
          <img width={60} src={logo} alt="icone home" />
          {' '}
          Reader.GOV

        </Navbar.Brand>
      </Container>
      <Container >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav"  >
          <Nav className="me-auto">
            {/* Se o usuário estiver logado */}
            {loggedInUser && (
              <>
                <Link className="nav-link" to="/">
                  Página inicial
                </Link>
                <Link className="nav-link" to="/profile">
                  Perfil
                </Link>
                <Link className="nav-link" to="/tasks">
                  Meus Documentos
                </Link>
              </>
            )}
            {/* Não está logado */}
            {!loggedInUser && (
              <>
                <Link className="nav-link" to="/">
                  Página inicial
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/sign-up">
                  Cadastre-se
                </Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

