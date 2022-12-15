import api from "../api/api";
import { useState, useEffect } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmaExclusao from "../components/ConfirmaExclusao";
import coverPlaceHolder from '../assets/book-cover-placeholder.png';


function DocumentEditarPage() {

  const { documentID } = useParams();

  const [showUpload, setShowUpload] = useState(false);

  const [form, setForm] = useState({
    titulo: "",
    orgao: "",
    imagem: "",
    texto: "",
    pdf: "",
    anotacoes: "",
    dataPublicacao: "",
    tipo: ""
  });

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {

    async function fetchDocuments() {

      try {

        const response = await api.get('/documents/get-one/' + documentID);

        const documentData = { ...response.data };

        setForm(documentData);

        setIsLoading(false);

      } catch (error) {
        console.log(error);
      }

    }

    fetchDocuments();
  }, [documentID]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!form.titulo) {
      toast.error("Informe o título");
      return;
    }

    if (!form.dataPublicacao) {
      toast.error("Informe a data da publicação");
      return;
    }

    const clone = { ...form };

    delete clone._id;

    try {

      await api.put('/documents/' + documentID, clone);

      toast.success("Alterações feitas com sucesso!!");

      navigate(`/documents/${documentID}`);

    } catch (error) {
      console.log(error);
      toast.error("As Alterações não foram concluídas");
    }
  }

  //#region Upload

  function handleShowUpload() {
    setShowUpload(!showUpload);
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
        setForm({ ...form, pdf: request.data.filename });

        fileInput.value = null;

        toast.success("O upload do arquivo foi bem sucedido!")

      } catch (e) {
        setForm({ ...form, pdf: "" });
        console.log(e);
        toast.error("Não foi possível fazer o upload deste arquivo!")
      }

    } else {
      console.log('You need to select a file');
      toast.error("Selecione um arquivo!")
    }
  }

  function cancelUpload(e) {
    e.preventDefault();
    const fileInput = document.getElementById("fileToUpload");
    fileInput.value = null;
    setShowUpload(false);
  }

  //#endregion Upload


  return (
    <div>
      <div className="row">
        <h3>Editar Documento</h3>
      </div>

      {!isLoading && (
        <div className="row">
          <div className="col-3 p-3">
            <div className="text-center mt-2 mb-3 documento-detalhe-imagem">
              <img className="img-fluid" src={form.imagem || coverPlaceHolder} alt={form.titulo} />
            </div>
            <div className="d-flex justify-content-around">
              <Button
                variant="outline-success"
                size="sm"
                onClick={handleSubmit}
              >
                Salvar
              </Button>{' '}

              <Button
                className="ms-1 me-1"
                size="sm"
                variant="outline-secondary" onClick={handleShowUpload}>
                Upload
              </Button>{' '}

              <Link to={`/documents`}
                className="btn btn-outline-secondary"
              >
                Voltar
              </Link>{' '}

              <span className="ms-1">
                <ConfirmaExclusao className="ms-1" config={{
                  apiDeleteRoute: '/documents/' + documentID,
                  successMessage: 'Documento excluído com sucesso!',
                  erroMessage: 'O Documento não pôde ser excluído da Biblioteca',
                  routeToNavigate: '/documents',
                  modalTitle: 'Excluir Documento',
                  modalBody: 'Deseja excluir este documento de sua Biblioteca?',
                }} />
              </span>

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
                      required={true}
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

                <div className="col-12">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="URL do PDF"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="pdf"
                      value={form.pdf}
                      onChange={handleChange}
                      placeholder="URL do PDF"
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
                      <option value="sei">SEI</option>
                      <option value="dou">D.O.U</option>
                    </Form.Select>

                  </FloatingLabel>
                </div>

                <div className="col-md-6">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Data publicação:"
                    className="mb-3"
                  >
                    <Form.Control
                      type="date"
                      name="dataPublicacao"
                      value={form.dataPublicacao ? form.dataPublicacao.split('T')[0] : ''}
                      onChange={handleChange}
                      required={true}
                    />
                  </FloatingLabel>
                </div>

                <div className="col-12">
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
                </div>

                {showUpload &&
                  <div className="col-12 mt-3">
                    <Form.Group className="mb-3" controlId="fileToUpload">
                      <Form.Label>Upload de Arquivo</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                    <Button onClick={handleUpload}>Upload</Button>
                    <Button variant="danger" onClick={cancelUpload}>Cancelar</Button>
                  </div>
                }


              </div>

            </Form>

          </div >
        </div >
      )
      }
    </div >
  );
}

export default DocumentEditarPage;
