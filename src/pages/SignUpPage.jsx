import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";

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

    //conferir se a senhas estão iguais
    if (form.password !== form.confirmPassword) {
      alert("Senhas incompatíveis");
      return;
    }

    //vou chamar a função handleUpload()
    
    // const imgURL = await handleUpload()
    //disparo a requisição de cadastro para o meu servidor
    try {
      await api.post("/user/sign-up", form);
      setForm(
        {name: "",
        email: "",
        password: "",
        confirmPassword: "",}
      )

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signUp-container">
    <Container
      // style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
    <Card className="card-signUp">
    <Card.Header style={{width: "100%", textAlign:"center", backgroundColor: "rgb(33,37,41)", color:"#c7c8c9"}} > <h4>Cadastro</h4> </Card.Header>
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" style={{padding: "10px 0"}}>
          <Form.Label>Nome completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira um nome para identificação"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Endereço de e-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira o seu melhor endereço de e-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma senha válida"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme a senha válida criada anteriormente"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <div style={{textAlign: "center"}}>
        <Button className="my-3" variant="dark" type="submit">
          Cadastrar usuário
        </Button>
        </div>
        
      </Form>
      <Form.Text>
        Já possui cadastro? Faça já o
        <Link className="text-warning fw-bold text-decoration-none" to="/login">
          {" "}
          login
        </Link>
        .
      </Form.Text>
      </Card>
    </Container>
    </div>
  );
}

export default SignUpPage;