import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./../components/BookPdf.css";
import pdf from "./../assets/pdfs/auto.pdf";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-hot-toast";
import api from "../api/api.js";
import { formatDateBR } from "../util/date.util.js";

/*ESSA VARIÁVEL DE URL USA UM OUTRO LINK ANTES PARA
EVITAR UM ERRO DE CORS */
//const urlCors = `https://cors-anywhere.herokuapp.com/`;
function BookPdf({ id, caminho, ultPagLida }) {
  /* PARA USAR A BIBLIOTECA PRECISA DE UM pdf.worker.js,
  IMPORTARMOS ELE DE OUTRO SITE PARA EVITAR PROBLEMAS NA BUILD E DEPLOY */
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [notes, setNotes] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await api.get(`/notes/book/${id}`);
        setNotes(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchNotes();
  }, [reload, id]);

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
      console.log(note);
      setReload(!reload);
      setForm(defaultNote);
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível incluir esta anotação!");
    }
  }

  function handleGotoPage(page){
    setPageNumber(page);
  }

  function handleEditNote(id) {
    alert(`Edit the note ${id}`)
  }

  function handleDeleteNote(id){
    alert(`Delete the note ${id}`)
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
          </div>
        </div>
      </div>
      <div>
        {/* OffCanvas */}
        <Form>
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
        { notes.map( (note) => {
            return (
              <Card className="mt-2 note-card-wrapper">
                { note.titulo && <Card.Header className="note-card-header">{note.titulo}</Card.Header> }
                <Card.Body className="note-card-body">{note.texto}</Card.Body>
                <Card.Footer className="note-card-footer">
                  <span>{ formatDateBR(note.updatedAt) }</span>
                  <span onClick={() => handleGotoPage(note.page)} title="Ir para página">pag.:{note.page}</span>
                  <span onClick={() => handleEditNote(note._id)} title="Editar anotação">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16px">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </span>
                  <span onClick={() => handleDeleteNote(note._id)}title="Apagar anotação">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16px">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </span>
                </Card.Footer>
              </Card>
            )
          }
        )}
      </div>
    </>
  );
}
export default BookPdf;
