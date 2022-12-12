import { useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { AuthContext } from "../contexts/authContext";
import logo from "../assets/logo.png";
import toast from 'react-hot-toast';

function LoginPage() {
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);

  const { setLoggedInUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await api.post("/user/login", form);
      setIsLoading(false);
      //validar se o usuário confirmou o email dele

      //setItem -> coloca algo dentro do localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      //atualizar o contexto
      setLoggedInUser({ ...response.data });

      /*  if (response.data.user.role === "ADMIN") {
            navigate("/admin")
        } */

      navigate("/profile");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      const message = error.response.data.msg;
      toast.error(message);
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginSide">
        <Container>
          <img
            src={logo}
            width="80"
            alt="logo"
          />
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>
                <strong>Email</strong>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                placeholder="Digite seu Email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>
                <strong>Senha</strong>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                placeholder="Insira sua Senha"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            >
              {/* <Form.Check
              type="checkbox"
              label="Check me out"
            /> */}
            </Form.Group>

            <Button
              size="lg"
              variant="dark"
              type="submit"
            >
              Entrar
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default LoginPage;
