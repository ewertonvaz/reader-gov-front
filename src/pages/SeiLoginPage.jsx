import NavbarSei from "../components/NavbarSei"
import {Card, Form, Button} from 'react-bootstrap'
import logoSei from "../assets/logo-sei.png"
import {User, Lock, Buildings} from "phosphor-react"

function SeiLoginPage(){


    return(
        <div>
            <NavbarSei/>
            <div className="body-sei">
            
                <Card className="card-sei">
                <img src={logoSei} width={200}/>
                    <Form>
                        <div style={{display: "flex"}}>
                        <span className="icon"><User size={20} /></span>
                        <span><Form.Control className="mb-3" type="text" placeholder="Usuário"/></span>
                        </div>
                        
                        <div style={{display: "flex"}}>
                        <span className="icon"><Lock size={20} /></span>
                        <span><Form.Control className="mb-3" type="password" placeholder="Senha"/></span>
                        </div>
                        <div style={{display: "flex"}}>
                        <span className="icon"><Buildings size={20} /></span>
                        <span className="select"><Form.Select className="mb-3">
                            <option></option>
                            <option>TJDFT</option>
                            <option>TRF1</option>
                            <option>MRE</option>
                        </Form.Select>
                        </span>
                        </div>
                        <button className="btn-sei">ACESSAR</button>
                    </Form>
                </Card>
                
            </div>
        </div>
    )

}
export default SeiLoginPage