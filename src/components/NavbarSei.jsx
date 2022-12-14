import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavbarSei(){


    return(
        <div style={{backgroundColor: "#0494c7"}}>
      <Navbar id='nav-sei'>
        <div style={{backgroundColor: "#155f9b", width:"100%"}}>
            <small style={{paddingLeft: "30px", fontSize:"0.8rem"}}>Tribunal Regional Federal da 1ª Região</small>
        </div>
        <Navbar.Brand style={{color:"#fff", paddingLeft: "30px"}}>Sistema Eletrônico de Informações</Navbar.Brand>
      </Navbar>
        </div>
    )
}

export default NavbarSei