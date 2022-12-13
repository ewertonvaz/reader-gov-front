import api from "../api/api";
import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import coverPlaceHolder from '../assets/book-cover-placeholder.png';

function DocumentCadastroPage() {

  const navigate = useNavigate();

  // const [showUpload, setShowUpload] = useState(false);

  const defaultForm = {
    titulo: "",
    orgao: "",
    imagem: "",
    texto: "",
    pdf: "",
    anotacoes: "",
    dataPublicacao: "",
    tipo: ""
  };

  const [form, setForm] = useState(defaultForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if(!form.titulo) {
      toast.error("Informe o título");
      return;
    }

    if(!form.tipo) {
      toast.error("Informe o tipo");
      return;
    }

    if(!form.dataPublicacao) {
      toast.error("Informe a data da publicação");
      return;
    }

    try {

      const document = await api.post('/documents', form);

      toast.success("Cadastro concluído com sucesso!!");

      navigate(`/documents/${document.data._id}`);

    } catch (error) {
      console.log(error);
      toast.error("o Cadastro não pode ser concluído");
    }
  }

  return (
    <div>
      <div className="row">
        <h2>Cadastrar Documento</h2>
      </div>

      <div className="row">
        <div className="col-3 p-3">
          <div className="text-center mt-2 mb-3 documento-detalhe-imagem">
            <img className="img-fluid" src={form.imagem || coverPlaceHolder} alt={document.titulo} />
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSubmit}
            >
              Salvar
            </Button>{' '}

            <Link to={`/documents`}
              className="btn btn-secondary btn-sm ms-1"
            >
              Voltar
            </Link>{' '}

            {/* <Button
              size="sm"
              variant="secondary" onClick={handleShowUpload}>
              Upload
            </Button>{' '} */}

          </div>
        </div>
        <div className="col-8 p-3">
          <Form>

            <div className="row g-2">

              <div className="col-12">
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
                    placeholder="Título do documento"
                  />
                </FloatingLabel>
              </div>

              <div className="col-12">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Órgão"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="orgao"
                    value={form.orgao}
                    onChange={handleChange}
                    placeholder="Nome do órgão"
                  />
                </FloatingLabel>
              </div>

              <div className="col-12">
                <FloatingLabel
                  controlId="floatingInput"
                  label="URL da imagem"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="imagem"
                    value={form.imagem}
                    onChange={handleChange}
                    placeholder="URL da imagem"
                  />
                </FloatingLabel>
              </div>

              <div className="col-md-6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tipo do documento"
                  className="mb-3"
                >
                  <Form.Select
                    name="tipo"
                    defaultValue={form.tipo}
                    onChange={handleChange}
                  >
                    <option>- Selecione -</option>
                    <option value="sei">SEI</option>
                    <option value="dou">D.O.U</option>
                  </Form.Select>
                </FloatingLabel>
              </div>

              <div className="col-md-6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Data da publicação:"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    name="dataPublicacao"
                    value={form.dataPublicacao}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </div>

              <div className="col-12">
              <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Anotações"
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
              </div>

            </div>

            {/* {showUpload &&
              <>
                <Form.Group className="mb-3" controlId="fileToUpload">
                  <Form.Label>Upload de Arquivo</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <Button onClick={handleUpload}>Upload</Button>
                <Button variant="danger" onClick={cancelUpload}>Cancelar</Button>
              </>
            } */}

          </Form>
        </div>
      </div>
    </div >
  );
}

export default DocumentCadastroPage;


 // function handleShowUpload() {
  //   setShowUpload(!showUpload);
  //   if (!showUpload) {

  //   }
  // }

  // async function handleUpload(e) {
  //   e.preventDefault();
  //   const fileInput = document.getElementById("fileToUpload");

  //   if (fileInput.files.length) {

  //     const upload_file = fileInput.files[0];

  //     const formData = new FormData();

  //     formData.append('file', upload_file);

  //     try {

  //       const request = await api.put("/cn/upload", formData);

  //       //Obtem o nome do arquivo / URL
  //       setForm({ ...form, caminho: request.data.filename });

  //       fileInput.value = null;

  //       toast.success("O upload do arquivo foi bem sucedido!")

  //     } catch (e) {
  //       setForm({ ...form, caminho: "" });
  //       console.log(e);
  //       toast.error("Não foi possível fazer o upload deste arquivo!")
  //     }

  //   } else {
  //     console.log('You need to select a file');
  //     toast.error("Selecione um arquivo!")
  //   }
  // }

  // function cancelUpload(e) {
  //   e.preventDefault();
  //   const fileInput = document.getElementById("fileToUpload");
  //   fileInput.value = null;
  //   setShowUpload(false);
  // }