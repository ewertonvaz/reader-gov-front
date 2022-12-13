import api from "../api/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import coverPlaceHolder from '../assets/book-cover-placeholder.png';
import { formatDateBR } from '../util/date.util';

function DocumentDetalhesPage() {

  const { documentID } = useParams();

  const [document, setDocument] = useState({});

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchDocument() {
      const response = await api.get('/documents/get-one/' + documentID);

      const documentApi = { ...response.data };

      setDocument(documentApi);

      setIsLoading(false);

    }

    fetchDocument();
  }, [documentID]);

  return (
    <div>
      <div className="row">
        <h2>Detalhes do Documento</h2>
      </div>


      {!isLoading && (

        <div className="row">
          <div className="col-3 p-3">
            <div className="text-center mt-3 mb-5 livro-detalhe-imagem">
              <img className="img-fluid" src={document.imagem || coverPlaceHolder} alt={document.titulo} />
            </div>

            <div className="text-center">
              <Link to={`/documents/${document._id}/edit`} className="btn btn-secondary">
                Editar
              </Link>
              <Link
                state={{ document }}
                to={`/documents/leitura/${document._id}`}
                className={`btn btn-secondary ms-1 ${document.pdf ? '' : 'disabled'}`}
              >
                Ler
              </Link>

              <Link to={`/documents`} className="btn btn-secondary ms-1">
                Voltar
              </Link>
            </div>
          </div>

          <div className="col p-3 bg-light">
            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Título:</div>
                <p className="text-muted">{document.titulo}</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Órgão:</div>
                <p className="text-muted">
                  {document.orgao ? document.orgao : "-"}
                </p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Tipo:</div>
                <p className="text-muted"> {document.tipo}</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Data da publicação:</div>
                <p className="text-muted">{document.dataPublicacao ? formatDateBR(document.dataPublicacao) : '-'}</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Anotações:</div>
                <p className="text-muted"> {document.anotacoes}</p>
              </div>
            </div>

          </div>
        </div>

      )}

    </div>
  );
}

export default DocumentDetalhesPage;
