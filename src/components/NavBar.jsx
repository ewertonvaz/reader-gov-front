import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import logo from '../assets/logo.png'


function NavBar() {
  const navigate = useNavigate();
  let { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  function signOut(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }

  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" to="/">
            <img width={40} src={logo} alt="icone home" />
            {' '}
            Reader.GOV
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            {/* Se o usuário estiver logado */}
            {loggedInUser && (
              <>
                <Link className="nav-link" to="/books">
                  Livros
                </Link>
                <Link className="nav-link" to="/documents">
                  Documentos
                </Link>
              </>
            )}

          </Nav>
          <Nav>

            {/* Se o usuário estiver logado */}
            {loggedInUser && (
              <>
                <NavDropdown title={loggedInUser.user.name} id="basic-nav-dropdown">

                  <NavLink as={NavLink} to='/profile' className='dropdown-item'>Editar Perfil</NavLink>

                  <NavDropdown.Divider />

                  <NavLink as={NavLink} to='/signout' onClick={signOut} className='dropdown-item'>Sair</NavLink>

                </NavDropdown>
              </>
            )}
            {/* Não está logado */}
            {!loggedInUser && (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/signup">
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

