import api from "../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from "../components/BookCard";
import Paginator from '../components/Paginator';


const TIPOS_STATUS = {
    LENDO: "Lendo",
    LER: "Ler",
    LIDO: "Lido"
};

const PAGE_SIZE = 12;


function HomePage() {

    const [livrosApiPorStatus, setLivrosApiPorStatus] = useState([]);

    const [livrosComPesquisa, setLivrosComPesquisa] = useState([]);

    const [livrosExibir, setLivrosExibir] = useState([]);


    const [status, setStatus] = useState(TIPOS_STATUS.LENDO);

    const [pesquisar, setPesquisar] = useState('');

    const [paginator, setPaginator] = useState({
        startIndex: 0,
        countResults: 0,
        totalItems: 0,
        currPage: 0,
        lastPage: 0
    });


    function handleTabChange(e) {
        setStatus(e.target.dataset.status);
    }

    function handlePesquisarChange(e) {
        setPesquisar(e.target.value);
    }

    function handleFormSubmit(e) {

        e.preventDefault();

        let livrosPesq;

        if (!pesquisar) {
            livrosPesq = livrosApiPorStatus;
        }
        else {

            livrosPesq = livrosApiPorStatus.filter((livro) => {

                const textoLivro = `${livro.titulo}|${livro.subtitulo}|${livro.autor}|${livro.anotacoes}`.toLowerCase();

                return textoLivro.includes(pesquisar.toLowerCase());

            });

        }

        setLivrosComPesquisa(livrosPesq);

        setPaginator(createStartPaginatorFromArray(livrosPesq));

    }

    /**
     * Buscar dados na API
     */
    useEffect(() => {

        async function fetchLivrosApiPorStatus() {

            const response = await api.get(`/books/status/${status}`);

            const livrosApi = response.data;

            setLivrosApiPorStatus(livrosApi);

            setLivrosComPesquisa(livrosApi);

            setPaginator(createStartPaginatorFromArray(livrosApi));

        }

        fetchLivrosApiPorStatus();

    }, [status]);

    /**
     * Realizar paginacao
     */
    useEffect(() => {

        const lst = livrosComPesquisa.slice(paginator.startIndex, paginator.startIndex + PAGE_SIZE);

        setLivrosExibir(lst);

    }, [livrosComPesquisa, paginator]);



    async function doPagination(startIndex, currPage) {

        setPaginator({
            ...paginator,
            startIndex: startIndex, // indice do primeiro registro sendo exibido
            currPage: currPage, // pagina atual
            countResults: livrosExibir.length, // qtd livros sendo exibidos
            totalItems: livrosComPesquisa.length, // qtd total de livros pesquisados
            lastPage: Math.ceil(livrosComPesquisa.length / PAGE_SIZE) - 1 // qtd total de paginas
        });

    }

    function createStartPaginatorFromArray(livros) {
        return {
            startIndex: 0, // indice do primeiro registro sendo exibido
            currPage: 0, // pagina atual
            countResults: livros.length < PAGE_SIZE ? livros.length : PAGE_SIZE, // qtd livros sendo exibidos
            totalItems: livros.length, // qtd total de livros pesquisados
            lastPage: Math.ceil(livros.length / PAGE_SIZE) - 1 // qtd total de paginas
        };
    }

    function getPaginatorContent() {

        if (livrosExibir.length) {

            return (
                <Paginator paginator={paginator} maxResults={PAGE_SIZE} doSearch={doPagination} />
            )

        }
        else {
            return (
                <div className="fs-5 ps-5">Nenhum livro encontrado</div>
            )
        }


    }


    return (
        <div>
            <div className="px-4">
                <div className="row justify-content-between">

                    <div className="col-4">
                        <form className="form-inline" onSubmit={handleFormSubmit}>
                            <div className="input-group">
                                <input className="form-control form-control-sm" type="text" placeholder="Buscar" name="pesquisar" id="pesquisar" onChange={handlePesquisarChange} />
                                <button className="btn btn-outline-secondary btn-sm">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>

                        </form>
                    </div>
                    <div className="col">
                        <form className="form-inline">
                            <div className="text-end">
                                <Link className="btn btn-outline-secondary btn-sm" to="/books/new">Novo livro
                                </Link>
                                <Link className="btn btn-outline-primary btn-sm ms-3" to="/books/google">Google Livros
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row pt-5">
                    <div className="col">

                        <ul className="nav nav-tabs" id="tabStatus">
                            <li className="nav-item">
                                <button className={`nav-link ${status === TIPOS_STATUS.LENDO ? 'active fw-bold' : ''}`} id="tab-lendo" data-status={TIPOS_STATUS.LENDO} type="button" onClick={handleTabChange}>Lendo</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${status === TIPOS_STATUS.LER ? 'active fw-bold' : ''}`} id="tab-ler" data-status={TIPOS_STATUS.LER} type="button" onClick={handleTabChange}>Quero ler</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${status === TIPOS_STATUS.LIDO ? 'active fw-bold' : ''}`} id="tab-lido" data-status={TIPOS_STATUS.LIDO} type="button" onClick={handleTabChange}>Lidos</button>
                            </li>

                        </ul>

                        <div className="mt-3 livro-lista">
                            {livrosExibir.map((livro) => {
                                return (
                                    <BookCard key={livro._id} livro={livro} />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="row pt-5 ">
                    {getPaginatorContent()}
                </div>
            </div>
        </div>
    );

}

export default HomePage;
