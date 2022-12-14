import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'


function NavBarEmpty() {

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
      </Container>
    </Navbar>

  );
}

export default NavBarEmpty;

