import api from "../api/api";
import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  FloatingLabel,

} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmaExclusao from "../components/ConfirmaExclusao";
import image from "../assets/placeholder-book.jpg";
import { formatDateFromApi } from "../util/date.util";


function EditarPage() {
  const { bookID } = useParams();

  const [showUpload, setShowUpload] = useState(false);

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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await api.get('/books/' + bookID);
        const bookData = { ...response.data };
        // Converte as datas recebidas da API
        const { dataInicio, dataConclusao } = bookData;
        if (dataInicio) {
          bookData.dataInicio = formatDateFromApi(dataInicio);
        }

        if (dataConclusao) {
          bookData.dataConclusao = formatDateFromApi(dataConclusao);
        }
        //
        setForm(bookData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBooks();
  }, [bookID]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // console.log(form);

  function handleShowUpload() {
    setShowUpload(!showUpload);
    if (!showUpload) {

    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    const fileInput = document.getElementById("fileToUpload");
    if (fileInput.files.length) {
      const upload_file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', upload_file);
      try {
        const request = await api.put("/cn/upload", formData);
        //Obtem o nome do arquivo / URL
        setForm({ ...form, caminho: request.data.filename });
        fileInput.value = null;
        toast.success("O upload do arquivo foi bem sucedido!")
      } catch (e) {
        setForm({ ...form, caminho: "" });
        console.log(e);
        toast.error("Não foi possível fazer o upload deste arquivo!")
      }
    } else {
      console.log('You need to select a file');
    }
  }

  function cancelUpload(e) {
    e.preventDefault();
    const fileInput = document.getElementById("fileToUpload");
    fileInput.value = null;
    setShowUpload(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const clone = { ...form };
    delete clone._id;

    try {
      await api.put('/books/' + bookID, clone);

      toast.success("Alterações feitas com sucesso!!");
      navigate(`/books/${bookID}`);

    } catch (error) {
      console.log(error);
      toast.error("As Alterações não foram concluídas");
    }
  }

  return (
    <div>
      <h3 style={{ textAlign: "start" }}>Editar Livro</h3>
      <Container>
        <Row>
          <Col className="col-3">
            <img
              variant="top"
              style={{
                width: "14rem",
                height: "20rem",
                marginTop: "30px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              src={form.imagemCapa ? form.imagemCapa : image}
              alt="capa do livro"
            />

            <div className="buttons">
              <Button
                variant="outline-success"
                onClick={handleSubmit}
              >
                Salvar
              </Button>{" "}
              <Link to={`/books`} className="btn btn-outline-secondary">
                Voltar
              </Link>
              <Button variant="outline-secondary" onClick={handleShowUpload}>
                Upload
              </Button>
              <ConfirmaExclusao config={{
                apiDeleteRoute: '/books/' + bookID,
                successMessage: 'Livro excluído com sucesso!',
                erroMessage: 'O Livro não pôde ser excluído da Biblioteca',
                routeToNavigate: '/books',
                modalTitle: 'Excluir Livro',
                modalBody: 'Deseja excluir este livro de sua Biblioteca?',
              }} />
            </div>
          </Col>

          <Col>
            <Form>
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
                  placeholder="Insíra o título do Livro"
                />
              </FloatingLabel>

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
                  placeholder="Insíra o subtítulo do Livro"
                />
              </FloatingLabel>

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
                  placeholder="Insíra o nome do autor do Livro"
                />
              </FloatingLabel>

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
                  placeholder="Insíra o número de páginas do Livro"
                />
              </FloatingLabel>

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
                  placeholder="Insíra o número de páginas do Livro"
                />
              </FloatingLabel>

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
                  placeholder="Insíra o gênero do Livro"
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Tipo"
                className="mb-3"
              >
                {!isLoading && (
                  <Form.Select
                    name="tipo"
                    defaultValue={form.tipo}
                    onChange={handleChange}
                  >
                    <option>Selecione o tipo de Extensão do arquivo</option>
                    <option value="PDF">PDF</option>
                    <option value="ePub">ePub</option>
                    <option value="Fisico">Fisico</option>
                  </Form.Select>
                )}
              </FloatingLabel>
            </Form>
            <div>
              <Form className="dataLeitura">
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
                  // placeholder="Insíra o título do Livro"
                  />
                </FloatingLabel>

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
              </Form>
            </div>
          </Col>

          <Col className="col">
            <Form>
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
                  placeholder="Insíra o idioma do Livro"
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Capa do Livro"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="imagemCapa"
                  value={form.imagemCapa}
                  onChange={handleChange}
                  placeholder="Insíra a URL da capa do Livro"
                />
              </FloatingLabel>

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

              <FloatingLabel
                controlId="floatingInput"
                label="Status"
                className="mb-3"
              >
                {!isLoading && (
                  <Form.Select
                    name="status"
                    defaultValue={form.status}
                    onChange={handleChange}
                  >
                    <option>Selecione o status de leitura</option>
                    <option value="Lido">Lido</option>
                    <option value="Ler">Quero Ler</option>
                    <option value="Lendo">Lendo</option>
                  </Form.Select>
                )}
              </FloatingLabel>

              <div className="mb-3">
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Observações"
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
                {showUpload &&
                  <>
                    <Form.Group className="mb-3" controlId="fileToUpload">
                      <Form.Label>Upload de Arquivo</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                    <Button onClick={handleUpload}>Upload</Button>
                    <Button variant="danger" onClick={cancelUpload}>Cancelar</Button>
                  </>
                }
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditarPage;
