import api from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import Paginator from '../components/Paginator';
import Spinner from '../components/shared/Spinner';


const DOC_TYPES = {
    SEI: 'sei',
    DOU: 'dou'
};

const PAGE_SIZE = 12;

const defaultFilter = {
    docType: DOC_TYPES.DOU,
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


function DocumentsPage() {

    const [searchResult, setSearchResult] = useState(defaultSearchResult);

    const [filter, setFilter] = useState(defaultFilter)

    const [paginator, setPaginator] = useState(defaultPaginator);

    const [isLoading, setIsLoading] = useState(true);


    async function handleTabChange(e) {

        setFilter({ ...filter, startIndex: 0, currPage: 0, docType: e.target.dataset.doctype });

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

            // TODO: ajustar a rota para o endpoint que faz os filtros quando ele for implementado no backend

            // const response = await api.get(`/documents?dt=${currentTypeDoc}&s=${paginator.startIndex}&ps=${PAGE_SIZE}&q=${textToSearch}`);

            // const response = await api.get(`/documents/get-all?dt=${filter.docType}&s=${filter.startIndex}&ps=${PAGE_SIZE}&q=${filter.search}`);

            const response = await api.get(`/documents/get-all`);


            // TODO: ajustar quando a API for ajustada para retornar um objeto no padrão esperado (o objeto temporário result poderá ser removido e ser utilizado diretamente o response.data conforme linha comentada)

            // const result = repsonse.data;

            const result = {
                total: response.data.length,
                items: response.data
            }



            // TODO: remover simulacoes de filtro da aba, da busca e da paginação quando o backend já retornar paginado


            // TODO: Remover - simulacao do filtro da aba 

            result.items = result.items.filter((doc) => doc.tipo === filter.docType);

            result.total = result.items.length;



            // TODO: Remover - simulacao do filtro da busca

            if (filter.search) {

                result.items = result.items.filter((doc) => {

                    const textoLivro = `${doc.titulo}|${doc.orgao}`.toLowerCase();

                    return textoLivro.includes(filter.search.toLowerCase());

                });

                result.total = result.items.length;

            }

            // TODO: Remover simulacao da paginacao 

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
                                <Link className="btn btn-outline-secondary btn-sm" to="/documents/new">Novo documento
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row pt-5">
                    <div className="col">

                        <ul className="nav nav-tabs" id="tabDocType">
                            <li className="nav-item">
                                <button className={`nav-link ${filter.docType === DOC_TYPES.DOU ? 'active fw-bold' : ''}`} id="tab-dou" data-doctype={DOC_TYPES.DOU} type="button" onClick={handleTabChange}>DOU</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${filter.docType === DOC_TYPES.SEI ? 'active fw-bold' : ''}`} id="tab-sei" data-doctype={DOC_TYPES.SEI} type="button" onClick={handleTabChange}>SEI</button>
                            </li>
                        </ul>

                        {isLoading && (
                            <div className='mt-5 d-flex justify-content-center'>
                                <Spinner color="#3955BD" width="48px" />
                            </div>
                        )}

                        {!isLoading && (

                            <>

                                <div className="mt-3 document-list">
                                    {searchResult.items.map((document) => {
                                        return (
                                            <ItemCard key={document._id} item={{
                                                route: `/documents/${document._id}`,
                                                image: document.imagem,
                                                title: document.titulo,
                                            }} />
                                        );
                                    })}
                                </div>

                                <div className="my-5 d-flex justify-content-center">
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

export default DocumentsPage;
