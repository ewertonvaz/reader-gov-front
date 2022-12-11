import api from "../api/api";
import { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import image from "../assets/placeholder-book.jpg";


function CadastroPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    googleID: "",
    autor: "",
    ranking: 0,
    categoria: "",
    imagemCapa: "",
    idioma: "",
    qtdPaginas: 0,
    titulo: "",
    subtitulo: "",
    ultPagLida: 0,
    anotacoes: "",
    dataInicio: "",
    dataConclusao: "",
    tipo: "",
    caminho: "",
    status: "Ler",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const livro = await api.post('/books', form);

      setForm({
        googleID: "",
        autor: "",
        ranking: "",
        categoria: "",
        imagemCapa: "",
        idioma: "",
        qtdPaginas: "",
        titulo: "",
        subtitulo: "",
        ultPagLida: "",
        anotacoes: "",
        dataInicio: "",
        dataConclusao: "",
        tipo: "",
        caminho: "",
        status: "Ler",
      });

      toast.success("Cadastro concluído com sucesso!!");

      console.log(livro);

      navigate(`/books/${livro.data._id}`)

    } catch (error) {
      console.log(error);
      toast.error("o Cadastro não pode ser concluído");
    }
  }
  console.log(form);

  return (
    <div>
      <h1 style={{ textAlign: "start" }}>Cadastrar Livro</h1>
      <Container>
        <Row>
          <Col className="col-3">

            <img
              variant="top"
              style={{ width: "14rem", height: "20rem", marginTop: "30px", border: "1px solid #ddd", borderRadius: "5px" }}
              src={form.imagemCapa ? form.imagemCapa : image}
              alt="capa do livro"
            />

            <div className="buttons">
              <Form.Group>
                <Button
                  variant="secondary"
                  disabled={form.titulo === "" ? true : false}
                  onClick={handleSubmit}
                >
                  Salvar
                </Button>{" "}
              </Form.Group>
              <Form.Group>
                <Link to="/books">
                  <Button variant="secondary">Voltar</Button>{" "}
                </Link>
              </Form.Group>
            </div>
          </Col>

          <Col>
            <Form>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Título"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    placeholder="Insira o título do Livro"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Subtítulo"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="subtitulo"
                    value={form.subtitulo}
                    onChange={handleChange}
                    placeholder="Insira o subtítulo do Livro"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Autor"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="autor"
                    value={form.autor}
                    onChange={handleChange}
                    placeholder="Insira o nome do autor do Livro"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Número de Páginas"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="qtdPaginas"
                    value={form.qtdPaginas}
                    onChange={handleChange}
                    placeholder="Insira o número de páginas do Livro"
                  />
                </FloatingLabel>
              </Form.Group>


              <FloatingLabel
                controlId="floatingInput"
                label="Última Página Lida"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="ultPagLida"
                  value={form.ultPagLida}
                  onChange={handleChange}
                  placeholder="Insira o número de páginas do Livro"
                />
              </FloatingLabel>

              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Categoria"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    placeholder="Insira o gênero do Livro"
                  />
                </FloatingLabel>
              </Form.Group>



              <div>
                <Form className="dataLeitura">
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Leitura iniciada em:"
                      className="mb-3"
                    >
                      <Form.Control
                        type="date"
                        style={{ width: "200px" }}
                        name="dataInicio"
                        value={form.dataInicio}
                        onChange={handleChange}
                      // placeholder="Insira o título do Livro"
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Leitura terminada em:"
                      className="mb-3"
                    >
                      <Form.Control
                        type="date"
                        style={{ width: "200px" }}
                        name="dataConclusao"
                        value={form.dataConclusao}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Form>
              </div>
            </Form>
          </Col>

          <Col className="col">
            <Form>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Avaliação"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="ranking"
                    value={form.ranking}
                    onChange={handleChange}
                    placeholder="De 1 a 5, quanto você gosta do Livro"
                  />
                </FloatingLabel>
              </Form.Group>


              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tipo"
                  className="mb-3"
                >
                  <Form.Select
                    name="tipo"

                    onChange={handleChange}
                  >
                    <option>Selecione o tipo de Extensão do arquivo</option>
                    <option value="pdf">PDF</option>
                    <option value="epub">e-Pub</option>
                    <option value="físico">Físico</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Idioma"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="idioma"
                    value={form.idioma}
                    onChange={handleChange}
                    placeholder="Insira o idioma do Livro"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Capa do Livro"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="imagemCapa"
                    value={
                      form.imagemCapa
                    }
                    onChange={handleChange}
                    placeholder="Insira a URL da capa do Livro"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="URL"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="caminho"
                    value={form.caminho}
                    onChange={handleChange}
                    placeholder="Insira a URL do repositório do Livro"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Comentários"
                >
                  <Form.Control
                    as="textarea"
                    name="anotacoes"
                    value={form.anotacoes}
                    onChange={handleChange}
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default CadastroPage;
