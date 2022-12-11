import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import logo from '../assets/logo.png'


function NavBar() {

  let { loggedInUser } = useContext(AuthContext);

  // TODO: REMOVER QUANDO A AUTENTICAÇÃO ESTIVER FUNCIONANDO
  loggedInUser = {
    user: {
      _id: "638fcb1da42461f2e82ef981",
      name: "Bob Esponja",
      email: "bob.esponja@gmail.com",
      role: "USER",
      active: true,
      tasks: [],
      createdAt: "2022-12-06T23:07:09.721Z",
      updatedAt: "2022-12-06T23:07:09.721Z",
      __v: 0
    },
    token: "token"
  };


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

            <Link className="nav-link" to="/">
              Home
            </Link>
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
                  <NavDropdown.Item>
                    <Link to="/profile">
                      Editar perfil
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/signout">
                      Sair
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {/* Não está logado */}
            {!loggedInUser && (
              <>
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

