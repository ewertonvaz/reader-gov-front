import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./../components/BookPdf.css";
import pdf from "./../assets/pdfs/auto.pdf";
import { Form } from "react-bootstrap";

/*ESSA VARIÁVEL DE URL USA UM OUTRO LINK ANTES PARA
EVITAR UM ERRO DE CORS */
//const urlCors = `https://cors-anywhere.herokuapp.com/`;
function BookPdf({ id, caminho, ultPagLida }) {
  /* PARA USAR A BIBLIOTECA PRECISA DE UM pdf.worker.js,
  IMPORTARMOS ELE DE OUTRO SITE PARA EVITAR PROBLEMAS NA BUILD E DEPLOY */
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
      </Form>
    </>
  );
}
export default BookPdf;
