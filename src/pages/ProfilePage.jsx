import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import api from "../api/api";
import image from "../assets/profile.jpeg";
import EditUser from "../components/EditUser";
import { formatDateBR, formatDateFromApi } from "../util/date.util";

function ProfilePage() {
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    profilePic: "",
    age: 0,
    email: "",
    role: "",
    active: true,
    birth: "",
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setForm({ name: response.data.name });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);
  console.log(user);
  const { address } = user;

  function signOut() {
    localStorage.removeItem("loggedInUser");

    setLoggedInUser(null);

    navigate("/");
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDeleteUser() {
    try {
      await api.delete("/user/delete");
      signOut();
    } catch (error) {
      console.log(error);
      alert("Algo deu errado no delete do user");
    }
  }

  return (
    <div className="userData">
      <h2>{user.name}</h2> 
      
      {!isLoading && (
        <Container>
        <Row>
          <Col className="col-3">
            <img
              variant="top"
              style={{
                width: "14rem",
                height: "15rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              src={form.profilePic ? form.profilePic : image}
              alt="imagem"
            />
            
            <Form.Group className="mb-3">
              <Form.Label>Editar Foto</Form.Label>
              <Form.Control
                type="file"
                name="profilePic"
                value={user.profilePic}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Usuário desde:</Form.Label>
              <Form.Control
                type="text"
                name="createdAt"
                value={formatDateBR(user.createdAt)}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Situação</Form.Label>
              {user.role === "ADMIN" && (
                <Form.Select
                  name="active"
                  disabled
                  onChange={handleChange}
                  defaultValue={user.active}
                >
                  <option value={true}>ATIVO</option>
                  <option value={false}>INATIVO</option>
                </Form.Select>
              )}
              {user.role === "USER" && (
                <p>{user.active? "ATIVO" : "INATIVO"}</p>
              )}
            </Form.Group>
            <Button variant="secondary">Editar</Button>{" "}
            <Button
              variant="danger"
              onClick={handleDeleteUser}
              style={ user.role === "USER"? {display:"none"} : {display: "block"}}
            >
              Deletar
            </Button>{" "}
          </Col>

          <Col>
            <Form.Group className="mb-3" style={ user.role === "USER"? {display:"none"} : {display: "block"}}>
              <Form.Label>Função</Form.Label>
              {!isLoading && (
                <Form.Select
                  
                  disabled
                  defaultValue={user.role}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </Form.Select>
              )}
            </Form.Group>
          </Col>
        </Row>
      </Container>
      )}
      
    </div>
  );
}

export default ProfilePage;
