import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./../components/BookPdf.css";
import pdf from "./../assets/pdfs/auto.pdf";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import api from "../api/api.js";

/*ESSA VARIÁVEL DE URL USA UM OUTRO LINK ANTES PARA
EVITAR UM ERRO DE CORS */
//const urlCors = `https://cors-anywhere.herokuapp.com/`;
function BookPdf({ id, caminho, ultPagLida }) {
  /* PARA USAR A BIBLIOTECA PRECISA DE UM pdf.worker.js,
  IMPORTARMOS ELE DE OUTRO SITE PARA EVITAR PROBLEMAS NA BUILD E DEPLOY */
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const defaultNote = {
    titulo: "",
    texto: "",
    page: 1,
  };

  const [form, setForm] = useState(defaultNote);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(!form.texto) {
      toast.error("Você precisa informar o texto o título");
      return;
    }

    if(form.page <= 0) {
      toast.error("Por favor informe o número da página!");
      return;
    }

    try {
      const note = await api.post(`/notes/${id}`, form);
      toast.success("Cadastro concluído com sucesso!!");
      //navigate(`/documents/${document.data._id}`);
      console.log(note);
      setForm(defaultNote);
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível incluir esta anotação!");
    }
  }

  const [numPages, setNumPages] = useState(null);
  const [url, setUrl] = useState(null);
  const [pageNumber, setPageNumber] = useState(ultPagLida);
  //const host = `${caminho}${id}.pdf`;
  const host = `${caminho}`;
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  useEffect(() => {
    //caminho.includes("http") ? setUrl(urlCors + host) : setUrl(pdf);
    caminho.includes("http") ? setUrl(host) : setUrl(pdf);
  }, [host]);

  /*Quando o documento é carregado com sucesso*/
  function onDocumentLoadSuccess({ numPages, options }) {
    setNumPages(numPages);
    setPageNumber(parseInt(ultPagLida));
  }

  function mudarPagina(offset) {
    setPageNumber((paginaAnterior) => paginaAnterior + offset);
  }

  function pagAnterior() {
    mudarPagina(-1);
  }

  function proxPagina() {
    mudarPagina(1);
  }
  return (
    <>
      <div className="main">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <div className="pagec">
            Página {pageNumber || (numPages ? 1 : "--")} de {numPages || "--"}
          </div>
          <div className="buttonc">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={pagAnterior}
              className="Pre"
            >
              Anterior
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={proxPagina}
            >
              Próxima
            </button>
            <button>Anotações</button>
          </div>
        </div>
      </div>
      <Form>
        <Form.Text>Teste de posicionamento</Form.Text>
          <Form.Control
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Título da anotação"
          />
          <Form.Control
            type="text"
            name="texto"
            value={form.texto}
            onChange={handleChange}
            placeholder="Texto da anotação"
          />
          <Form.Control
            type="number"
            name="page"
            value={form.page}
            onChange={handleChange}
          />
          <Button
              variant="secondary"
              size="sm"
              onClick={handleSubmit}
            >
            Salvar
          </Button>{' '}

          <Button variant="secondary"
            size="sm"
            onClick={()=>{}}
          >
            Cancelar
          </Button>{' '}
      </Form>
    </>
  );
}
export default BookPdf;
