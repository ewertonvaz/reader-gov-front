import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./../components/BookPdf.css";
import pdf from "./../assets/pdfs/auto.pdf";
import { Card, Offcanvas, Button  } from "react-bootstrap";
import { toast } from "react-hot-toast";
import api from "../api/api.js";
import { formatLocaleBR } from "../util/date.util.js";
import NoteModalForm from "./NoteModalForm";

/*ESSA VARIÁVEL DE URL USA UM OUTRO LINK ANTES PARA
EVITAR UM ERRO DE CORS */
//const urlCors = `https://cors-anywhere.herokuapp.com/`;
function BookPdf({ id, caminho, ultPagLida }) {
  /* PARA USAR A BIBLIOTECA PRECISA DE UM pdf.worker.js,
  IMPORTARMOS ELE DE OUTRO SITE PARA EVITAR PROBLEMAS NA BUILD E DEPLOY */
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [show, setShow] = useState(false);
  const [notes, setNotes] = useState([]);
  const [reload, setReload] = useState(false);
  const [modalTitle, setModalTitle] = useState("Incluir Anotação");
  const [numPages, setNumPages] = useState(null);
  const [url, setUrl] = useState(null);
  const [pageNumber, setPageNumber] = useState(ultPagLida);
  const [showNotes, setShowNotes] = useState(false);

  const handleCloseNotes = () => setShowNotes(false);
  const handleShowNotes = () => setShowNotes(true);

  //const host = `${caminho}${id}.pdf`;
  const host = `${caminho}`;
  const defaultNote = {
    titulo: "",
    texto: "",
    page: pageNumber ? pageNumber : 1,
  };
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  const [form, setForm] = useState(defaultNote);

  function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
  }

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


  function handleGotoPage(page){
    setPageNumber(page);
  }

  function handleEditNote(id) {
    setModalTitle("Editar Anotação");
    const actualNote = notes.filter( note => note._id === id );
    setForm(actualNote[0]);
    setShow(true);
  }

  async function handleDeleteNote(id){
    try {
      const response = await api.delete(`/notes/book/${id}`);
      toast.success("Anotação removida com sucesso!");
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }

  function handleIncludeNote(){
    setModalTitle("Incluir Anotação");
    setForm({ ...form, page: pageNumber});
    setShow(true);
  }

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
        <span title="Exibir Anotação" className="notes-app-clickable" onClick={handleShowNotes}>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="32px">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
         </span>
         <span title="Incluir Anotação" className="notes-app-clickable" onClick={handleIncludeNote}>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="32px">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
         </span>
        <NoteModalForm 
          title={modalTitle}
          id={id}
          show={show}
          setShow={setShow}
          reload={reload}
          setReload={setReload}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
          defaultNote={defaultNote}
        />
        
        <Offcanvas show={showNotes} onHide={handleCloseNotes} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Anotações</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          { notes.map( (note) => {
              return (
                <Card key={note._id} className="mt-2 note-card-wrapper">
                  { note.titulo && <Card.Header className="note-card-header">{note.titulo}</Card.Header> }
                  <Card.Body className="note-card-body">{note.texto}</Card.Body>
                  <Card.Footer className="note-card-footer">
                    <span>{ formatLocaleBR(note.updatedAt) }</span>
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
        </Offcanvas.Body>
      </Offcanvas>
        
      </div>
    </>
  );
}
export default BookPdf;
