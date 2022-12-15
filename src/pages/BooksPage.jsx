import api from "../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from "../components/ItemCard";
import Paginator from '../components/Paginator';
import Spinner from '../components/shared/Spinner';


const TIPOS_STATUS = {
    LENDO: "Lendo",
    LER: "Ler",
    LIDO: "Lido"
};

const PAGE_SIZE = 12;

const defaultFilter = {
    status: TIPOS_STATUS.LENDO,
    startIndex: 0,
    currPage: 0,
    search: ''
};

const defaultSearchResult = {
    total: 0,
    items: []
};

const defaultPaginator = {
    startIndex: 0,
    countResults: 0,
    totalItems: 0,
    currPage: 0,
    lastPage: 0
};


function BooksPage() {

    const [searchResult, setSearchResult] = useState(defaultSearchResult);

    const [filter, setFilter] = useState(defaultFilter)

    const [paginator, setPaginator] = useState(defaultPaginator);

    const [isLoading, setIsLoading] = useState(true);


    async function handleTabChange(e) {

        setFilter({ ...filter, startIndex: 0, currPage: 0, status: e.target.dataset.status });

    }

    async function handleFormSubmit(e) {

        e.preventDefault();

        const searchInput = document.getElementById('search');

        setFilter({ ...filter, startIndex: 0, currPage: 0, search: searchInput.value });

    }

    async function doPagination(startIndex, currPage) {

        if (filter.startIndex !== startIndex || filter.currPage !== currPage) {

            setFilter({ ...filter, startIndex, currPage });

        }

    }

    function getPaginatorContent() {

        if (searchResult.items.length) {

            return (
                <Paginator paginator={paginator} maxResults={PAGE_SIZE} doSearch={doPagination} />
            )

        }
        else {

            return (
                <div className="fs-5 ps-5">Nenhum registro encontrado</div>
            )

        }

    }

    useEffect(() => {

        async function fetchDocuments() {

            setIsLoading(true);

            // TODO: ajustar quando  o endpoint que faz os filtros estiver implementado no backend

            // const response = await api.get(`/books?status=${filter.status}&s=${filter.startIndex}&ps=${PAGE_SIZE}&q=${filter.search}`);
            const response = await api.get(`/books/status/${filter.status}`);

            // TODO: ajustar quando a API for ajustada para retornar um objeto no padrão esperado (o objeto temporário result poderá ser removido e ser utilizado diretamente o response.data conforme linha comentada)

            // const result = repsonse.data;

            const result = {
                total: response.data.length,
                items: response.data
            }


            // TODO: remover simulação busca e paginação quando o backend já retornar paginado

            if(filter.search) {

                result.items = result.items.filter((livro) => {

                    const textoLivro = `${livro.titulo}|${livro.subtitulo}|${livro.autor}|${livro.anotacoes}`.toLowerCase();
                
                    return textoLivro.includes(filter.search.toLowerCase());
                
                });

                result.total = result.items.length;

            }

            result.items = result.items.slice(filter.startIndex, filter.startIndex + PAGE_SIZE);

            
            setSearchResult(result);

            setPaginator({
                startIndex: filter.startIndex, // indice do primeiro registro sendo exibido
                currPage: filter.currPage, // pagina atual
                countResults: result.items.length, // qtd registros sendo exibidos
                totalItems: result.total, // qtd total de registros pesquisados
                lastPage: Math.ceil(result.total / PAGE_SIZE) - 1 // qtd total de paginas
            });

            setIsLoading(false);

        }

        fetchDocuments();

    }, [filter]);


    return (
        <div>
            <div className="px-4 pt-3">
                <div className="row justify-content-between">

                    <div className="col-4">
                        <form className="form-inline" onSubmit={handleFormSubmit}>
                            <div className="input-group">
                                <input className="form-control form-control-sm" type="text" placeholder="Buscar" id="search" />
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
                                <button className={`nav-link ${filter.status === TIPOS_STATUS.LENDO ? 'active fw-bold' : ''}`} id="tab-lendo" data-status={TIPOS_STATUS.LENDO} type="button" onClick={handleTabChange}>Lendo</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${filter.status === TIPOS_STATUS.LER ? 'active fw-bold' : ''}`} id="tab-ler" data-status={TIPOS_STATUS.LER} type="button" onClick={handleTabChange}>Quero ler</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${filter.status === TIPOS_STATUS.LIDO ? 'active fw-bold' : ''}`} id="tab-lido" data-status={TIPOS_STATUS.LIDO} type="button" onClick={handleTabChange}>Lidos</button>
                            </li>

                        </ul>

                        {isLoading && (
                            <div className='mt-5 d-flex justify-content-center'>
                                <Spinner color="#3955BD" width="48px" />
                            </div>
                        )}

                        {!isLoading && (

                            <>

                                <div className="mt-3 livro-lista">
                                    {searchResult.items.map((livro) => {
                                        return (
                                            <ItemCard key={livro._id} item={{
                                                route: `/books/${livro._id}`,
                                                image: livro.imagemCapa,
                                                title: livro.titulo,
                                            }} />
                                        );
                                    })}
                                </div>

                                <div className="mt-5">
                                    {getPaginatorContent()}
                                </div>

                            </>

                        )}

                    </div>
                </div>
            </div>
        </div>
    );

}

export default BooksPage;
