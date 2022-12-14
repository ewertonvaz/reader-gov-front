import { Table, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import api from "../api/api.js";
import EditUser from "../components/EditUser.jsx";
import EditUserByAdmin from "./EditUserByAdminPage.js";
import {useNavigate} from 'react-router-dom'
//import ModalCreateBook from "../components/ModalCreateBook";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [autorized, setAutorized] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/user/all-users");
        setUsers(response.data);
        setAutorized(true);
      } catch(error) {
        console.log(error);
        setAutorized(false);
      }
    }
    fetchUsers();
  }, []);

  function passarUsuario(user){
   
    
    return (
      <EditUserByAdmin user={user}/>,
      navigate('/edit-user')
    )
      
    
    
  }

  return (
    <div>
      <h1>Usuários</h1>
      {
        autorized ?
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>e-mail</th>
                <th>Papéis</th>
                <th>Active?</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.active}</td>
                    <td>
                    <Link className="btn btn-outline-secondary" to={`/edit-user/${user._id}`}>Detalhes</Link>
                    {/* <Button onClick={()=>passarUsuario(user)} variant="outline-secondary">Detalhes</Button> */}
                      
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {/* <ModalCreateBook /> */}
        </Container>
      :
      <p>Não autorizado a acessar este Recurso!</p>
    }
    </div>
  );
}

export default UserListPage;