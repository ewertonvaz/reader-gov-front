import api from "../api/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import coverPlaceHolder from '../assets/book-cover-placeholder.png';
import Rating from "../components/shared/Rating";
import { formatDateBR } from "../util/date.util";

function DetalhesPage() {
  const { bookID } = useParams();

  const [book, setBook] = useState({});

  const [progressoLeitura, setProgressoLeitura] = useState(0);

  useEffect(() => {
    async function fetchLivro() {
      const response = await api.get('/books/' + bookID);

      const livroApi = { ...response.data };
      // Converte as datas recebidas da API
      const { dataInicio, dataConclusao } = livroApi;
      if (dataInicio) {
        livroApi.dataInicio = formatDateBR(dataInicio);
      }

      if (dataConclusao) {
        livroApi.dataConclusao = formatDateBR(dataConclusao);
      }
      //
      setBook(livroApi);

      setProgressoLeitura(
        livroApi.qtdPaginas
          ? Math.floor((livroApi.ultPagLida / livroApi.qtdPaginas) * 100)
          : 0
      );
    }

    fetchLivro();
  }, [bookID]);

  return (
    <div>
      <div className="row">
        <h3>Detalhes do Livro</h3>
      </div>
      <div className="row">
        <div className="col-3 p-3">
          <div className="text-center mt-3 mb-5 livro-detalhe-imagem">
            <img className="img-fluid" src={book.imagemCapa || coverPlaceHolder} alt={book.titulo} />
          </div>

          <div className="text-center">
            <Link to={`/books/${book._id}/edit`} className="btn btn-outline-secondary">
              Editar
            </Link>
            <Link
              state={{ livro: book }}
              to={`/leitura/book/${book._id}`}
              className={`btn btn-outline-secondary ms-1 ${book.caminho ? '' : 'disabled'}`}
            >
              Ler
            </Link>

            <Link to={`/books`} className="btn btn-outline-secondary ms-1">
              Voltar
            </Link>
          </div>
        </div>

        <div className="col p-3 bg-light">
          <div className="row mb-3">
            <div className="col">
              <div className="fw-bold">Título:</div>
              <p className="text-muted">{book.titulo}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <div className="fw-bold">Subtítulo:</div>
              <p className="text-muted">
                {book.subtitulo ? book.subtitulo : "-"}
              </p>
            </div>
            <div className="col">
              <div className="fw-bold">Autor:</div>
              <p className="text-muted"> {book.autor}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <div className="fw-bold">Categoria:</div>
              <p className="text-muted"> {book.categoria}</p>
            </div>
            <div className="col">
              <div className="fw-bold">Idioma:</div>
              <p className="text-muted"> {book.idioma}</p>
            </div>
            <div className="col">
              <div className="fw-bold">Rating:</div>
              <div className="text-muted">
                <Rating showRate={false} width="120px" color="#0d6efd">{book.ranking}</Rating>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <div className="fw-bold">Número de páginas:</div>
              <p className="text-muted"> {book.qtdPaginas}</p>
            </div>
            <div className="col">
              <div className="fw-bold">Última página lida:</div>
              <p className="text-muted"> {book.ultPagLida}</p>
            </div>
            <div className="col"></div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <div className="fw-bold">Data início leitura:</div>
              <p className="text-muted"> {book.dataInicio}</p>
            </div>
            <div className="col">
              <div className="fw-bold">Data conclusão leitura:</div>
              <p className="text-muted"> {book.dataConclusao}</p>
            </div>

            <div className="col">
              <div className="fw-bold">Status:</div>
              <p className="text-muted"> {book.status}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <div className="fw-bold mb-2">Progresso da leitura:</div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progressoLeitura}%` }}
                  aria-valuenow={progressoLeitura}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {progressoLeitura}%
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>

          <div className="row mb-3">
            <div className="col pt-2">
              <div className="fw-bold mb-2">Observações:</div>
              <div className="text-muted">{book.anotacoes}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesPage;
