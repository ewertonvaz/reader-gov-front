import NavbarSei from "../components/NavbarSei"
import {Card, Form, Button} from 'react-bootstrap'
import logoSei from "../assets/logo-sei.png"

function SeiLoginPage(){


    return(
        <div>
            <NavbarSei/>
            <div className="body-sei">
            
                <Card className="card-sei">
                <img src={logoSei} width={200}/>
                    <Form>
                        <Form.Control className="mb-3" type="text" placeholder="Usuário"/>
                        <Form.Control className="mb-3" type="text" placeholder="Usuário"/>
                        <Form.Control className="mb-3" type="text" placeholder="Usuário"/>
                        <button className="btn-sei" >ACESSAR</button>
                    </Form>
                </Card>
                
            </div>
        </div>
    )

}
export default SeiLoginPage