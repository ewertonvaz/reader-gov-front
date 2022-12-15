import api from "../api/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import coverPlaceHolder from '../assets/book-cover-placeholder.png';
import { formatDateBR } from '../util/date.util';

const DOC_TYPES = {
  sei: 'SEI',
  dou: 'DOU',
};

function DocumentDetalhesPage() {

  const { documentID } = useParams();

  const [form, setForm] = useState({});

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchDocument() {
      const response = await api.get('/documents/get-one/' + documentID);

      const documentApi = { ...response.data };

      if (!documentApi.pdf.toLowerCase().startsWith('http')) {
        documentApi.pdf = 'http://' + documentApi.pdf;
      }

      setForm(documentApi);

      setIsLoading(false);

    }

    fetchDocument();
  }, [documentID]);

  return (
    <div>
      <div className="row">
        <h3>Detalhes do Documento</h3>
      </div>


      {!isLoading && (

        <div className="row">
          <div className="col-3 p-3">
            <div className="text-center mt-3 mb-5 document-detalhe-imagem">
              <img className="img-fluid" src={form.imagem || coverPlaceHolder} alt={form.titulo} />
            </div>

            <div className="text-center">
              <Link to={`/documents/${form._id}/edit`} className="btn btn-outline-secondary">
                Editar
              </Link>
              <Link
                state={{ form }}
                to={`/leitura/document/${form._id}`}
                className={`btn btn-outline-secondary ms-1 ${form.pdf ? '' : 'disabled'}`}
              >
                Ler
              </Link>

              <Link to={`/documents`} className="btn btn-outline-secondary ms-1">
                Voltar
              </Link>
            </div>
          </div>

          <div className="col p-3 bg-light">
            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Título:</div>
                <p className="text-muted">{form.titulo}</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Órgão:</div>
                <p className="text-muted">
                  {form.orgao ? form.orgao : "-"}
                </p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Tipo:</div>
                <p className="text-muted"> {DOC_TYPES[form.tipo]}</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">URL do PDF:</div>
                <a href={form.pdf} target='_blank' rel="noreferrer">{form.pdf}</a>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Data da publicação:</div>
                <p className="text-muted">{form.dataPublicacao ? formatDateBR(form.dataPublicacao) : '-'}</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="fw-bold">Observações:</div>
                <p className="text-muted"> {form.anotacoes}</p>
              </div>
            </div>

          </div>
        </div>

      )}

    </div>
  );
}

export default DocumentDetalhesPage;
