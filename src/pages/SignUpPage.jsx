import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import NavBarEmpty from '../components/NavBarEmpty';
import toast from "react-hot-toast";

function SignUpPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //esse state vai guardar a IMAGEM escolhida pelo usuário
  // const [img, setImg] = useState();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // function handleImage(e) {
  //   //console.log(e.target.files[0]);
  //   setImg(e.target.files[0]);

  // }

  // async function handleUpload(e) {
  //   try {
  //     // const uploadData = new FormData();
  //     // uploadData.append("file", img)

  //     const response = await api.put("/cn/upload", uploadData )

  //     console.log(uploadData);

  //     return response.data.filename
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function handleSubmit(e) {

    e.preventDefault();

    const confirmPasswordInvalidDiv = document.getElementById('confirmPasswordInvalid');

    confirmPasswordInvalidDiv.classList.add('d-none');

    //conferir se a senhas estão iguais
    if (form.password !== form.confirmPassword) {
      confirmPasswordInvalidDiv.classList.remove('d-none');
      return;
    }

    if (!form.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/)) {
      toast.error("Senha não atende aos requisitos de segurança");
      return;
    }

    //vou chamar a função handleUpload()

    // const imgURL = await handleUpload()
    //disparo a requisição de cadastro para o meu servidor
    try {
      await api.post("/user/sign-up", form);
      setForm(
        {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
      )
      
      toast.success("Cadastro realizado com sucesso.\n Verifique seu e-mail para ativar a conta!", {duration: 6000});
      
      navigate("/login");
      
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }

  return (
    <>
      <NavBarEmpty />
      <div className="signUp-container">
        <Container className="d-flex flex-column align-items-center">
          <Card className="card-signUp">
            <Card.Header style={{ width: "100%", textAlign: "center", backgroundColor: "rgb(33,37,41)", color: "#c7c8c9" }} > <h4>Cadastro</h4> </Card.Header>
            <Form className="px-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" style={{ padding: "10px 0" }}>
                <Form.Label>Nome completo</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Endereço de e-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <div className="form-text">Use oito ou mais caracteres com uma combinação de letras, números e símbolos</div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirmar senha</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <div id="confirmPasswordInvalid" className="form-text text-danger d-none">As senhas informadas devem ser iguais</div>
              </Form.Group>

              <div style={{ textAlign: "center" }}>
                <Button className="my-3" variant="dark" type="submit">
                  Cadastrar usuário
                </Button>
              </div>

            </Form>
            <Form.Text>
              Já possui cadastro? Faça o
              <Link className="text-warning fw-bold text-decoration-none" to="/login">
                {" "}
                login
              </Link>
              .
            </Form.Text>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default SignUpPage;